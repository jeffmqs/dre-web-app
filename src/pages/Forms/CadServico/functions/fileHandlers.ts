import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useToast } from "@chakra-ui/react";
import { DreAnualRequest } from "../types/receitaDespesaTypes";

const useFileHandler = (
  dreAnualRequests: DreAnualRequest[],
  setDreAnualRequests: (data: DreAnualRequest[]) => void
) => {
  const toast = useToast();

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension === "csv") {
      handleCSV(file);
    } else if (["xlsx", "xls"].includes(fileExtension || "")) {
      handleExcel(file);
    } else {
      toast({
        title: "Formato Inválido",
        description: "Por favor, envie um arquivo CSV ou Excel (.xlsx, .xls).",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        processParsedData(results.data);
      },
      error: () => {
        toast({
          title: "Erro",
          description: "Falha ao processar o arquivo CSV.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const handleExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const parsedData = workbook.SheetNames.flatMap((sheetName) => {
        const year = parseInt(sheetName, 10);
        if (isNaN(year)) return [];
        const rows = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);
        return rows.map((row) => ({ ...row, ano: year }));
      });

      processParsedData(parsedData);
    };

    reader.onerror = () => {
      toast({
        title: "Erro",
        description: "Falha ao processar o arquivo Excel.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    };

    reader.readAsBinaryString(file);
  };

  const processParsedData = (data: any[]) => {
    const newData: DreAnualRequest[] = [];

    data.forEach((row) => {
      const ano = parseInt(row.ano, 10);
      if (isNaN(ano)) return;

      let dreAnual = newData.find((item) => item.ano === ano);
      if (!dreAnual) {
        dreAnual = {
          ano,
          receitas: [],
          despesas: [],
          cmv: 0,
          depreciacao: 0,
          taxaImposto: 0,
        };
        newData.push(dreAnual);
      }

      if (row.tipo === "receita") {
        dreAnual.receitas.push({
          modeloReceita: row.modeloReceita,
          tipoReceita: row.tipoReceita,
          descricao: row.descricao,
          ticketMedio: parseFloat(row.ticketMedio || "0"),
          cac: parseFloat(row.cac || "0"),
          investimentoMkt: parseFloat(row.investimentoMkt || "0"),
          conversaoInbound: parseFloat(row.conversaoInbound || "0"),
          vendasInbound: parseFloat(row.vendasInbound || "0"),
          clientesTotais: parseFloat(row.clientesTotais || "0"),
          cancelamento: parseFloat(row.cancelamento || "0"),
          consultorias: parseFloat(row.consultorias || "0"),
          ticketMedioConsultorias: parseFloat(row.ticketMedioConsultorias || "0"),
          receitaBrutaTotal: parseFloat(row.receitaBrutaTotal || "0"),
          comissoes: parseFloat(row.comissoes || "0"),
        });
      } else if (row.tipo === "despesa") {
        dreAnual.despesas.push({
          descricao: row.descricao,
          tipoDespesa: row.tipoDespesa,
          valor: parseFloat(row.valor || "0"),
          comissoes: parseFloat(row.comissoes || "0"),
          cmv: parseFloat(row.cmv || "0"),
        });
        dreAnual.cmv += parseFloat(row.cmv || "0");
      } else if (row.tipo === "depreciacao") {
        dreAnual.depreciacao = parseFloat(row.depreciacao || "0");
      } else if (row.tipo === "taxaImposto") {
        dreAnual.taxaImposto = parseFloat(row.taxaImposto || "0");
      }
    });

    const anosExistentes = dreAnualRequests.map((item) => item.ano);
    const novosDados = newData.filter((item) => !anosExistentes.includes(item.ano));

    if (novosDados.length > 0) {
      setDreAnualRequests([...dreAnualRequests, ...novosDados]);
      toast({
        title: "Sucesso",
        description: `${novosDados.length} ano(s) importado(s) com sucesso!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Nenhum dado novo",
        description: "Todos os anos do arquivo já estão registrados.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { handleImportCSV };
};

export default useFileHandler;
