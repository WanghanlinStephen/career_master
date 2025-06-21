import React from "react";
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Snackbar } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const Vip = () => {
  const navigate = useNavigate();

  // **🔥 单次购买**
  const oneTimePurchase = { id: "one-time", name: "单次使用", price: 5, description: "可使用1次高级功能" };

  // **🔥 会员计划**
  const membershipPlans = [
    { id: "monthly", name: "月费会员", price: 15, description: "30天高级会员，自动续费" },
    { id: "quarterly", name: "季度会员", price: 40, description: "90天高级会员，自动续费" },
    { id: "yearly", name: "年度会员", price: 120, description: "365天高级会员，自动续费" },
  ];

  // **🔥 选择套餐后跳转到支付方式页面**
  const handleSelectPlan = (plan) => {
    navigate("/payment_options", { state: { plan } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        选择你的充值方式
      </Typography>

      {/* 🔥 单次购买（粉色按钮） */}
      <Typography variant="h5" align="center" sx={{ mt: 3, mb: 2 }}>
        单次购买
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 5, textAlign: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h6">{oneTimePurchase.name}</Typography>
              <Typography variant="h4" color="primary">
                ${oneTimePurchase.price}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>{oneTimePurchase.description}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FF4081", color: "#fff", "&:hover": { backgroundColor: "#E91E63" } }}
                startIcon={<FavoriteIcon />}
                onClick={() => handleSelectPlan(oneTimePurchase)}
              >
                立即购买
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* 🔥 会员充值（蓝色按钮） */}
      <Typography variant="h5" align="center" sx={{ mt: 5, mb: 2 }}>
        会员充值
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {membershipPlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 5, textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h6">{plan.name}</Typography>
                <Typography variant="h4" color="primary">
                  ${plan.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{plan.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PaymentIcon />}
                  onClick={() => handleSelectPlan(plan)}
                >
                  立即充值
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Vip;
