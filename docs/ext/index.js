module.exports = () => {
    return [
        '',
        {
            title: "创建和使用扩展",
            collapsable: true,
            children: [
                ['basics/', '概述'],
                'basics/install.md',
                'basics/download.md',
                'basics/load.md',
                'basics/spi.md'
            ]
        },
        {
            title: "使扩展安全",
            collapsable: true,
            children: [
                ['security/', '概述']
            ]
        }
    ]
}
