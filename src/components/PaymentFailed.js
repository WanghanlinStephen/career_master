import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <ErrorIcon sx={{ fontSize: 80, color: "red" }} />
      <Typography variant="h4" color="error" sx={{ mt: 2 }}>
        支付失败
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        你的支付未成功，请重试。
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate("/vip")}>
        返回会员中心
      </Button>
    </Container>
  );
};

export default PaymentFailed;
