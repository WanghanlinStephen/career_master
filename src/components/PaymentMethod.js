import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Grid, TextField, Button, Box, CircularProgress } from "@mui/material";
import AlipayIcon from "@mui/icons-material/AccountBalanceWallet";
import WeChatIcon from "@mui/icons-material/Chat";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {}; // 从上个页面获取选中的套餐

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [qrCode, setQrCode] = useState(""); // 存储二维码链接
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardholder: "",
    number: "",
    expiry: "",
    cvc: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    street: "",
    phone: "",
    email: "",
  });

  if (!plan) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          请选择一个充值套餐
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/vip")}>
          返回会员中心
        </Button>
      </Container>
    );
  }

  // **🔥 处理支付**
  const handlePayment = async (method) => {
    setLoading(true);
    setSelectedMethod(method);
    
    if (method === "wechat") {
      setQrCode("https://auto-resume-storage.s3.us-east-2.amazonaws.com/wechat_pay.jpg");
    } else if (method === "alipay") {
      setQrCode("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/pay");
    } else {
      setQrCode("");
    }
  
    setLoading(false);
  };
  

  // **🔥 确认信用卡支付**
  const handlePaymentConfirm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("/pay_vip/", {
        plan_id: plan.id,
        amount: plan.price,
        method: "credit_card",
        card_info: creditCardInfo,
      });

      if (response.status === 200) {
        navigate("/payment-success", { state: { plan, method: "credit_card" } });
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      navigate("/payment-failed");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        选择支付方式
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* 支付宝 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ 
              textAlign: "center", 
              cursor: "not-allowed", 
              borderRadius: 3, 
              boxShadow: 5, 
              opacity: 0.5,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <AlipayIcon sx={{ fontSize: 50, color: "#1677FF" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>支付宝</Typography>
              <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                暂不可用
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 微信支付 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ 
              textAlign: "center", 
              cursor: "pointer", 
              borderRadius: 3, 
              boxShadow: 5, 
              transition: "0.3s", 
              "&:hover": { transform: "scale(1.05)" } 
            }}
            onClick={() => handlePayment("wechat")}
          >
            <CardContent>
              <WeChatIcon sx={{ fontSize: 50, color: "#07C160" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>微信支付</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 信用卡支付 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ 
              textAlign: "center", 
              cursor: "not-allowed", 
              borderRadius: 3, 
              boxShadow: 5,
              opacity: 0.5,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <CreditCardIcon sx={{ fontSize: 50, color: "#FF9800" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>信用卡</Typography>
              <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                暂不可用
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 生成的二维码 */}
      {qrCode && (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            请使用{selectedMethod === "alipay" ? "支付宝" : "微信"}扫描二维码
          </Typography>
          <Box
            sx={{
              width: 300,
              height: 300,
              margin: "0 auto",
              mt: 2,
              border: "1px solid rgba(0, 255, 242, 0.3)",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(0, 255, 242, 0.2)",
            }}
          >
            <img 
              src={qrCode} 
              alt="支付二维码" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain",
                padding: "10px"
              }} 
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            扫描上方二维码完成支付
          </Typography>
        </Box>
      )}

      {/* 🔥 信用卡支付表单 */}
      {selectedMethod === "credit_card" && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" align="center" gutterBottom>请输入信用卡信息</Typography>
          <TextField label="持卡人姓名" fullWidth margin="normal" value={creditCardInfo.cardholder} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardholder: e.target.value })} />
          <TextField label="卡号" fullWidth margin="normal" value={creditCardInfo.number} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, number: e.target.value })} />
          <TextField label="到期日期 (MM/YY)" fullWidth margin="normal" value={creditCardInfo.expiry} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expiry: e.target.value })} />
          <TextField label="CVC" fullWidth margin="normal" type="password" value={creditCardInfo.cvc} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvc: e.target.value })} />
          <TextField label="街道地址" fullWidth margin="normal" value={creditCardInfo.street} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, street: e.target.value })} />
          <TextField label="邮政编码" fullWidth margin="normal" value={creditCardInfo.zip} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, zip: e.target.value })} />
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button 
              variant="contained" 
              onClick={handlePaymentConfirm}
              disabled={loading}
              sx={{
                backgroundColor: '#00fff2',
                color: '#020816',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 242, 0.8)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "确认支付"}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PaymentMethod;
