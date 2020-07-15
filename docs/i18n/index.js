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
        'locale/identify.md',
        'locale/matching.md',
        'locale/scope.md',
        'locale/services.md'
      ]
    },
    {
      title: '隔离指定 Locale 数据',
      collapsable: true,
      children: [
        'resbundle/',
        'resbundle/concept.md',
        'resbundle/prepare.md',
        'resbundle/propfile.md',
        'resbundle/list.md',
        'resbundle/control.md'
      ]
    }
  ]
}
