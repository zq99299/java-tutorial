module.exports = () => {
  return [
    '',
    {
      title: '介绍',
      collapsable: true,
      children: [
        'intro/',
        'intro/quick.md',
        'intro/checklist.md'
      ]
    },
    {
      title: '设置语言环境',
      collapsable: true,
      children: [
        'locale/',
        'locale/create.md',
        'locale/extensions.md',
        'locale/identify.md'
      ]
    }
  ]
}
