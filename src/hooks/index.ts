"use client"

import { useCallback, useState } from "react";
import axios from 'axios';

type IProp = {
  fileName?: string;
  id?: string; // ID of either the transaction or invoice
  type: "transaction" | "invoice";
};

export default function useReceiptDownload(props?: IProp) {
  const [loading, setLoading] = useState(false);
  const [fileId, setFileID] = useState("");
  const { type, fileName, id } = props || {};

  const genDownloadLink = useCallback(
    async (link: string, fileName: string) => {
      var a = document.createElement("a");

      a.setAttribute("download", fileName);
      a.setAttribute("href", link);

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    []
  );

  const onDownload = useCallback(
    async (fileName?: string, id?: string): Promise<void> => {
      try {
        setFileID(id as string);
        setLoading(true);
        const res = await axios.post(
          `http://localhost:3001/product/api`,
          {
            html: `<p style="color: #f00">hello my very world</p>`
          }
        );

        await genDownloadLink(
          window.URL.createObjectURL(
            new Blob([res.data], { type: "application/pdf" })
          ),
          String(fileName)
        );
        setLoading(false);
      } catch (e: any) {
        console.log("error happend");
        setLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [genDownloadLink]
  );

  return {
    fileId,
    loading,
    onDownload,
  };
}
