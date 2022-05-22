module.exports = {
  types: [
    { value: '✨feat', name: '✨feat:          增加新功能' },
    { value: '🐛fix', name: '🐛fix:           修复bug' },
    { value: '📝docs', name: '📝docs:          修改文档' },
    { value: '🚀perf', name: '🚀perf:          性能优化' },
    { value: '📦build', name: '📦build:         打包' },
    { value: '👷ci', name: '👷ci:            CI部署' },
    { value: '🔂revert', name: '🔂revert:        版本回退' },
    { value: '💎 style', name: '💎style:         样式修改不影响逻辑' },
    { value: '🚨test', name: '🚨test:          增删测试' },
  ],
  messages: {
    type: '请选择提交的类型；',
    customScope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请选择要关闭的issue（可选）',
    confirmCommit: '确认要使用以上信息提交？（y/n）',
  },
  skip: ['body', 'footer'],
  subjectLimit: 72,
};
