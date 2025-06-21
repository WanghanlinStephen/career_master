import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

// 这里是可供渲染的主题数据
// iframeUrl 就是我们要内嵌的地址，比如 "https://registry.jsonresume.org/thomasdavis?theme=elegant"
const themeList = [
  {
    name: 'Elegant',
    author: 'Mudassir',
    iframeUrl: 'https://registry.jsonresume.org/thomasdavis?theme=elegant',
    value: 'elegant',
  },
  {
    name: 'Professional',
    author: 'Thomas Davis',
    iframeUrl: 'https://registry.jsonresume.org/thomasdavis?theme=professional',
    value: 'professional',
  },
  {
    name: 'Kendall',
    author: 'M. Adam Kendall',
    iframeUrl: 'https://registry.jsonresume.org/thomasdavis?theme=kendall',
    value: 'kendall',
  },
  {
    name: 'Macchiato',
    author: 'Alessandro Biondi',
    iframeUrl: 'https://registry.jsonresume.org/thomasdavis?theme=macchiato',
    value: 'macchiato',
  },
  {
    name: 'Relaxed',
    author: 'ObserverOfTime',
    iframeUrl: 'https://registry.jsonresume.org/thomasdavis?theme=relaxed',
    value: 'relaxed',
  },
];

const ThemeSelectionWithIframe = () => {
  const [selectedTheme, setSelectedTheme] = useState('');

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select a Theme (Iframe Preview)
      </Typography>
      <Grid container spacing={3}>
        {themeList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.value}>
            <Card
              variant="outlined"
              sx={{
                border:
                  selectedTheme === item.value
                    ? '2px solid #FFD700'
                    : '1px solid #ccc',
                transition: 'border 0.2s',
              }}
            >
              {/* 以 IFRAME 形式展示网页 */}
              <CardMedia
                component="iframe"
                src={item.iframeUrl}
                // 你也可以改成固定宽高，根据需要
                sx={{
                  width: '100%',
                  height: 300,
                  border: 'none',
                  // 如果想禁止滚动，可加 scrolling="no"，不过 React 并不直接支持，需要写成 <iframe scrolling="no" ...>
                }}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  by {item.author}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                {/* 打开原链接 */}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => window.open(item.iframeUrl, '_blank')}
                >
                  Open Page
                </Button>
                {/* 选择主题 */}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setSelectedTheme(item.value)}
                >
                  {selectedTheme === item.value ? 'Selected' : 'Select'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThemeSelectionWithIframe;
