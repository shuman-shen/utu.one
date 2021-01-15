import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container, LinearProgress, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import tableIcons from "../utilities/tableIcons";
import moment from "moment";
import axios from "axios";

const StyledPriceText = styled(Typography)({
  color: (props) => (props.positive === "true" ? "green" : "red"),
});

const renderPriceText = (data) => {
  return (
    <StyledPriceText positive={data >= 0 ? "true" : "false"}>{`${data.toFixed(
      2
    )}%`}</StyledPriceText>
  );
};

const PriceListTable = () => {
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:5000/api/latest",
    })
      .then((res) => {
        if (res.statusText === "OK") {
          setPriceList(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [priceList, setPriceList] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="md">
      {loading && <LinearProgress color="primary" />}
      <MaterialTable
        title="Crypto Currency Latest Price"
        columns={[
          { title: "Currency", field: "currency" },
          {
            title: "Date",
            field: "date",
            render: (rowData) => moment(rowData.date).format("DD/MM/YYYY"),
          },
          {
            title: "24 hrs",
            field: "oneDayDiff",
            render: (rowData) => renderPriceText(rowData.oneDayDiff),
          },
          {
            title: "7 days",
            field: "sevenDaysDiff",
            render: (rowData) => renderPriceText(rowData.sevenDaysDiff),
          },
          {
            title: "1 month",
            field: "oneMonthDiff",
            render: (rowData) => renderPriceText(rowData.oneMonthDiff),
          },
          {
            title: "Volume",
            field: "volume",
            render: (rowData) => rowData.volume.toLocaleString("en-AU"),
          },
          {
            title: "Market Cap",
            field: "marketCap",
            render: (rowData) => rowData.marketCap.toLocaleString("en-AU"),
            sorting: true,
            defaultSort: "desc",
          },
        ]}
        data={priceList}
        options={{
          filtering: false,
          sorting: true,
          search: false,
          actionsColumnIndex: -1,
        }}
        icons={tableIcons}
      />
    </Container>
  );
};

export default PriceListTable;
