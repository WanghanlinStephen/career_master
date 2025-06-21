import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, method } = location.state || {};

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
      <Typography variant="h4" color="primary" sx={{ mt: 2 }}>
        支付成功！
      </Typography>
      {plan && method && (
        <Typography variant="h6" sx={{ mt: 1 }}>
          你已成功购买 {plan.name}，支付方式：{method === "alipay" ? "支付宝" : method === "wechat" ? "微信支付" : "信用卡"}。
        </Typography>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        返回首页
      </Button>
    </Container>
  );
};

export default PaymentSuccess;
