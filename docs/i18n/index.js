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
    },
    {
      title: '格式化',
      collapsable: true,
      children: [
        'format/',
        {
          title: '数字和货币',
          collapsable: true,
          children: [
            'format/numberintro.md',
            'format/numberFormat.md',
            'format/decimalFormat.md'
          ]
        },
        {
          title: '日期和时间',
          collapsable: true,
          children: [
            'format/dateintro.md',
            'format/dateFormat.md',
            'format/simpleDateFormat.md',
            'format/dateFormatSymbols.md'
          ]
        },
        {
          title: '文本信息',
          collapsable: true,
          children: [
            'format/messageintro.md',
            'format/messageFormat.md',
            'format/choiceFormat.md'
          ]
        }
      ]
    },
    {
      title: '使用文本',
      collapsable: true,
      children: [
        'text/',
        'text/charintro.md',
        {
          title: '字符串比较',
          collapsable: true,
          children: [
            'text/collationintro.md',
            'text/locale.md',
            'text/rule.md',
            'text/perform.md'
          ]
        },
        {
          title: 'Unicode',
          collapsable: true,
          children: [
            'text/unicode.md',
            'text/terminology.md',
            'text/supplementaryChars.md',
            'text/characterClass.md'
          ]
        },
        {
          title: '检查文本边界',
          collapsable: true,
          children: []
        },
        {
          title: '转换非 unicode 文本',
          collapsable: true,
          children: []
        },
        {
          title: '规范化文本',
          collapsable: true,
          children: []
        },
        {
          title: '使用 JTextComponent 类处理双向文本',
          collapsable: true,
          children: []
        }
      ]
    }
  ]
}
