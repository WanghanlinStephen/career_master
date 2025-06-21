import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.auto-resume.site/',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // token 过期或无效
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

// 创建用于调用后端 API 的实例
const backendInstance = axios.create({
  // 使用相对路径，通过代理访问后端
  baseURL: '/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // 禁用 credentials 以避免 CORS 预检请求
  withCredentials: false
});

// 添加请求拦截器来处理 CORS
backendInstance.interceptors.request.use(
  (config) => {
    // 确保请求头正确设置
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器来处理 CORS 错误
backendInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Backend request error:', error);
    if (error.response?.status === 0) {
      // CORS 错误通常表现为 status 0
      throw new Error('CORS 错误：后端服务器未正确配置跨域访问');
    }
    return Promise.reject(error);
  }
);

// 测试后端连接
export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    
    // 先测试 OPTIONS 请求
    try {
      const optionsResponse = await backendInstance.options('/api/chat-phase1');
      console.log('OPTIONS request successful:', optionsResponse);
    } catch (optionsError) {
      console.log('OPTIONS request failed (this might be normal):', optionsError);
    }
    
    // 测试 GET 请求到根路径
    const response = await backendInstance.get('/');
    console.log('Backend connection test successful:', response);
    return { success: true, message: '后端连接正常' };
  } catch (error) {
    console.error('Backend connection test failed:', error);
    
    // 更详细的错误分析
    let errorMessage = '后端连接失败';
    if (error.code === 'ERR_NETWORK') {
      errorMessage = '网络连接失败，无法访问后端服务器';
    } else if (error.response?.status === 0) {
      errorMessage = 'CORS 错误：后端服务器未正确配置跨域访问';
    } else if (error.response?.status === 404) {
      errorMessage = '后端服务器响应，但 API 端点不存在';
    } else if (error.response?.status === 403) {
      errorMessage = '访问被拒绝，可能是 CORS 配置问题';
    } else if (error.response?.status) {
      errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`;
    } else {
      errorMessage = `连接失败: ${error.message}`;
    }
    
    return { 
      success: false, 
      message: errorMessage,
      details: error
    };
  }
};

// 生成职业转型计划的 API 函数
export const generateCareerPlan = async (planData) => {
  try {
    console.log('Sending request to backend:', {
      url: '/api/chat-phase1',
      data: planData
    });
    
    const response = await backendInstance.post('/api/chat-phase1', planData);
    console.log('Backend response:', response);
    return response.data;
  } catch (error) {
    console.error('Error generating career plan:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
      code: error.code
    });
    
    // 如果是 CORS 错误，尝试使用 fetch API
    if (error.code === 'ERR_NETWORK' || error.response?.status === 0) {
      console.log('Trying alternative method with fetch...');
      return await generateCareerPlanWithFetch(planData);
    }
    
    // 更详细的错误信息
    if (error.code === 'ERR_NETWORK') {
      throw new Error('无法连接到后端服务器，请检查网络连接或联系管理员');
    } else if (error.response?.status === 404) {
      throw new Error('API 端点不存在，请检查后端配置');
    } else if (error.response?.status === 500) {
      throw new Error('后端服务器内部错误');
    } else if (error.response?.status === 403) {
      throw new Error('访问被拒绝，可能是 CORS 配置问题');
    } else {
      throw new Error(`网络请求失败: ${error.message}`);
    }
  }
};

// 使用 fetch API 的备用方法
const generateCareerPlanWithFetch = async (planData) => {
  try {
    console.log('Using fetch API as fallback...');
    const response = await fetch('/api/chat-phase1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(planData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Fetch API response:', data);
    return data;
  } catch (fetchError) {
    console.error('Fetch API also failed:', fetchError);
    throw new Error(`所有请求方法都失败: ${fetchError.message}`);
  }
};

export default instance; 