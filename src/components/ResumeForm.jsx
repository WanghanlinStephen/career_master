import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Collapse,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ResumeForm = ({ onFormChange }) => {
  // 基础信息
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: ''
  });

  // 教育信息
  const [education, setEducation] = useState([
    { school: '', major: '', degree: '', startDate: '', endDate: '', gpa: '' }
  ]);

  // 专业技能
  const [skills, setSkills] = useState('');

  // 工作经历
  const [workExperience, setWorkExperience] = useState([
    { company: '', position: '', startDate: '', endDate: '', description: '' }
  ]);

  // 项目经历
  const [projects, setProjects] = useState([
    { name: '', role: '', startDate: '', endDate: '', description: '' }
  ]);

  // 奖项
  const [awards, setAwards] = useState([
    { name: '', date: '', description: '' }
  ]);

  // 发表文章
  const [publications, setPublications] = useState([
    { title: '', date: '', description: '' }
  ]);

  // 必填项验证
  const [errors, setErrors] = useState({
    basicInfo: { name: false, phone: false, email: false },
    education: [false],
    skills: false,
    workExperience: [false]
  });

  // 添加成功案例数据
  const successCases = [
    { id: 1, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/1.png' },
    { id: 2, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/2.png' },
    { id: 3, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/3.png' },
    { id: 4, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/4.png' },
    { id: 5, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/5.png' },
    { id: 6, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/6.png' },
    { id: 7, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/7.png' },
    { id: 8, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/8.png' },
    { id: 9, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/9.png' },
    { id: 10, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/10.png' },
    { id: 11, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/11.png' },
    { id: 12, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/12.png' },
    { id: 13, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/13.png' },
    { id: 14, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/14.png' },
    { id: 15, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/15.png' },
    { id: 16, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/16.png' },
    { id: 17, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/17.png' },
    { id: 18, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/18.png' },
    { id: 19, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/19.png' },
    { id: 20, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/20.png' },
    { id: 21, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/21.png' },
    { id: 22, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/22.png' },
    { id: 23, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/23.png' },
    { id: 24, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/24.png' },
    { id: 25, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/25.png' },
    { id: 26, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/26.png' },
    { id: 27, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/27.png' },
    { id: 28, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/28.png' },
  ];

  // 添加图片查看状态
  const [selectedImage, setSelectedImage] = useState(null);

  // 处理基础信息变化
  const handleBasicInfoChange = (field, value) => {
    const newBasicInfo = { ...basicInfo, [field]: value };
    setBasicInfo(newBasicInfo);
    onFormChange({ basicInfo: newBasicInfo, education, skills, workExperience, projects, awards, publications });
  };

  // 处理教育信息变化
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
    onFormChange({ basicInfo, education: newEducation, skills, workExperience, projects, awards, publications });
  };

  // 添加教育信息
  const addEducation = () => {
    setEducation([...education, { school: '', major: '', degree: '', startDate: '', endDate: '', gpa: '' }]);
    setErrors({ ...errors, education: [...errors.education, false] });
  };

  // 删除教育信息
  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
    
    const newErrors = { ...errors };
    newErrors.education.splice(index, 1);
    setErrors(newErrors);
  };

  // 处理专业技能变化
  const handleSkillsChange = (value) => {
    setSkills(value);
    onFormChange({ basicInfo, education, skills: value, workExperience, projects, awards, publications });
  };

  // 处理工作经历变化
  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setWorkExperience(newWorkExperience);
    onFormChange({ basicInfo, education, skills, workExperience: newWorkExperience, projects, awards, publications });
  };

  // 添加工作经历
  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { company: '', position: '', startDate: '', endDate: '', description: '' }]);
    setErrors({ ...errors, workExperience: [...errors.workExperience, false] });
  };

  // 删除工作经历
  const removeWorkExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
    
    const newErrors = { ...errors };
    newErrors.workExperience.splice(index, 1);
    setErrors(newErrors);
  };

  // 处理项目经历变化
  const handleProjectsChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
    onFormChange({ basicInfo, education, skills, workExperience, projects: newProjects, awards, publications });
  };

  // 添加项目经历
  const addProject = () => {
    setProjects([...projects, { name: '', role: '', startDate: '', endDate: '', description: '' }]);
  };

  // 删除项目经历
  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  // 处理奖项变化
  const handleAwardsChange = (index, field, value) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    setAwards(newAwards);
    onFormChange({ basicInfo, education, skills, workExperience, projects, awards: newAwards, publications });
  };

  // 添加奖项
  const addAward = () => {
    setAwards([...awards, { name: '', date: '', description: '' }]);
  };

  // 删除奖项
  const removeAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  // 处理发表文章变化
  const handlePublicationsChange = (index, field, value) => {
    const newPublications = [...publications];
    newPublications[index] = { ...newPublications[index], [field]: value };
    setPublications(newPublications);
    onFormChange({ basicInfo, education, skills, workExperience, projects, awards, publications: newPublications });
  };

  // 添加发表文章
  const addPublication = () => {
    setPublications([...publications, { title: '', date: '', description: '' }]);
  };

  // 删除发表文章
  const removePublication = (index) => {
    const newPublications = [...publications];
    newPublications.splice(index, 1);
    setPublications(newPublications);
  };

  // 验证表单
  const validateForm = () => {
    const newErrors = { ...errors };
    
    // 验证基础信息
    newErrors.basicInfo = {
      name: !basicInfo.name,
      phone: !basicInfo.phone,
      email: !basicInfo.email
    };
    
    // 验证教育信息
    newErrors.education = education.map(edu => !edu.school || !edu.major || !edu.degree);
    
    // 验证专业技能
    newErrors.skills = !skills;
    
    // 验证工作经历
    newErrors.workExperience = workExperience.map(work => !work.company || !work.position);
    
    setErrors(newErrors);
    
    // 检查是否有错误
    const hasErrors = 
      Object.values(newErrors.basicInfo).some(error => error) ||
      newErrors.education.some(error => error) ||
      newErrors.skills ||
      newErrors.workExperience.some(error => error);
    
    return !hasErrors;
  };

  // 获取表单数据
  const getFormData = () => {
    return {
      basicInfo,
      education,
      skills,
      workExperience,
      projects,
      awards,
      publications
    };
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {/* 基础信息 */}
        <Paper sx={{ p: 3, mb: 3, background: 'rgba(2, 8, 22, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 255, 242, 0.3)' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            基础信息 <span style={{ color: '#ff4444' }}>*</span>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="姓名"
                value={basicInfo.name}
                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                fullWidth
                required
                error={errors.basicInfo.name}
                helperText={errors.basicInfo.name ? "请输入姓名" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'rgba(0, 255, 242, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00fff2',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="电话"
                value={basicInfo.phone}
                onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                fullWidth
                required
                error={errors.basicInfo.phone}
                helperText={errors.basicInfo.phone ? "请输入电话" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'rgba(0, 255, 242, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00fff2',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="邮箱"
                value={basicInfo.email}
                onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                fullWidth
                required
                error={errors.basicInfo.email}
                helperText={errors.basicInfo.email ? "请输入邮箱" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'rgba(0, 255, 242, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00fff2',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LinkedIn（选填）"
                value={basicInfo.linkedin}
                onChange={(e) => handleBasicInfoChange('linkedin', e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'rgba(0, 255, 242, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 255, 242, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00fff2',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* 教育信息 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            教育信息 <span style={{ color: 'red' }}>*</span>
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  教育经历 {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => removeEducation(index)}
                    sx={{ color: '#00fff2' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="学校"
                    fullWidth
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                    error={errors.education[index]}
                    helperText={errors.education[index] ? "请输入学校" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="专业"
                    fullWidth
                    value={edu.major}
                    onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                    error={errors.education[index]}
                    helperText={errors.education[index] ? "请输入专业" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="学位"
                    fullWidth
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    error={errors.education[index]}
                    helperText={errors.education[index] ? "请输入学位" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="GPA"
                    fullWidth
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="开始日期"
                    value={edu.startDate ? new Date(edu.startDate) : null}
                    onChange={(newValue) => {
                      handleEducationChange(index, 'startDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="结束日期"
                    value={edu.endDate ? new Date(edu.endDate) : null}
                    onChange={(newValue) => {
                      handleEducationChange(index, 'endDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {index === education.length - 1 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={addEducation}
                  sx={{ mt: 2, color: '#00fff2' }}
                >
                  添加教育经历
                </Button>
              )}
            </Box>
          ))}
        </Paper>

        {/* 专业技能 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            专业技能 <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={skills}
            onChange={(e) => handleSkillsChange(e.target.value)}
            placeholder="请输入您的专业技能，例如：JavaScript, React, Node.js, Python等"
            error={errors.skills}
            helperText={errors.skills ? "请输入专业技能" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 107, 53, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 107, 53, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B35',
                },
              },
            }}
          />
        </Paper>

        {/* 工作经历 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            工作经历 <span style={{ color: 'red' }}>*</span>
          </Typography>
          {workExperience.map((work, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  工作经历 {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => removeWorkExperience(index)}
                    sx={{ color: '#00fff2' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="公司"
                    fullWidth
                    value={work.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                    error={errors.workExperience[index]}
                    helperText={errors.workExperience[index] ? "请输入公司名称" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="职位"
                    fullWidth
                    value={work.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    error={errors.workExperience[index]}
                    helperText={errors.workExperience[index] ? "请输入职位" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="开始日期"
                    value={work.startDate ? new Date(work.startDate) : null}
                    onChange={(newValue) => {
                      handleWorkExperienceChange(index, 'startDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="结束日期"
                    value={work.endDate ? new Date(work.endDate) : null}
                    onChange={(newValue) => {
                      handleWorkExperienceChange(index, 'endDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="工作描述"
                    multiline
                    rows={3}
                    fullWidth
                    value={work.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {index === workExperience.length - 1 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={addWorkExperience}
                  sx={{ mt: 2, color: '#00fff2' }}
                >
                  添加工作经历
                </Button>
              )}
            </Box>
          ))}
        </Paper>

        {/* 项目经历 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            项目经历
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  项目 {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => removeProject(index)}
                    sx={{ color: '#00fff2' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="项目名称"
                    fullWidth
                    value={project.name}
                    onChange={(e) => handleProjectsChange(index, 'name', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="担任角色"
                    fullWidth
                    value={project.role}
                    onChange={(e) => handleProjectsChange(index, 'role', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="开始日期"
                    value={project.startDate ? new Date(project.startDate) : null}
                    onChange={(newValue) => {
                      handleProjectsChange(index, 'startDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="结束日期"
                    value={project.endDate ? new Date(project.endDate) : null}
                    onChange={(newValue) => {
                      handleProjectsChange(index, 'endDate', newValue ? newValue.toISOString().split('T')[0] : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: 'rgba(0, 255, 242, 0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 255, 242, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00fff2',
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="项目描述"
                    multiline
                    rows={3}
                    fullWidth
                    value={project.description}
                    onChange={(e) => handleProjectsChange(index, 'description', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {index === projects.length - 1 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={addProject}
                  sx={{ mt: 2, color: '#00fff2' }}
                >
                  添加项目经历
                </Button>
              )}
            </Box>
          ))}
        </Paper>

        {/* 奖项 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            奖项
          </Typography>
          {awards.map((award, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  奖项 {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => removeAward(index)}
                    sx={{ color: '#00fff2' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="奖项名称"
                    fullWidth
                    value={award.name}
                    onChange={(e) => handleAwardsChange(index, 'name', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="获奖日期"
                    fullWidth
                    value={award.date}
                    onChange={(e) => handleAwardsChange(index, 'date', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="奖项描述"
                    multiline
                    rows={2}
                    fullWidth
                    value={award.description}
                    onChange={(e) => handleAwardsChange(index, 'description', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {index === awards.length - 1 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={addAward}
                  sx={{ mt: 2, color: '#00fff2' }}
                >
                  添加奖项
                </Button>
              )}
            </Box>
          ))}
        </Paper>

        {/* 发表文章 */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>
            发表文章
          </Typography>
          {publications.map((pub, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  文章 {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => removePublication(index)}
                    sx={{ color: '#00fff2' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="文章标题"
                    fullWidth
                    value={pub.title}
                    onChange={(e) => handlePublicationsChange(index, 'title', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="发表日期"
                    fullWidth
                    value={pub.date}
                    onChange={(e) => handlePublicationsChange(index, 'date', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="文章描述"
                    multiline
                    rows={2}
                    fullWidth
                    value={pub.description}
                    onChange={(e) => handlePublicationsChange(index, 'description', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(0, 255, 242, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 255, 242, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00fff2',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              {index === publications.length - 1 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={addPublication}
                  sx={{ mt: 2, color: '#00fff2' }}
                >
                  添加发表文章
                </Button>
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default ResumeForm; 