module.exports = () => {
    return [
        '',
        {
            title: "网络概述",
            collapsable: true,
            children: [
                ['overview/','网络概述'],
                'overview/alreadyknow.md',
                'overview/networking.md',
            ]
        },
        {
            title: "使用 URL",
            collapsable: true,
            children: [
                ['urls/','使用 URL 概述'],
                'urls/definition.md',
                'urls/creatingUrls.md',
                'urls/urlInfo.md',
                'urls/readingURL.md',
                'urls/connecting.md',
                'urls/readingWriting.md'
            ]
        },
        {
            title: "套接字 Sockets",
            collapsable: true,
            children: [
                ['sockets/','套接字 Sockets 概述'],
                'sockets/definition.md',
                'sockets/readingWriting.md',
                'sockets/clientServer.md',
            ]
        },
        {
            title: "数据报 / datagrams",
            collapsable: true,
            children: [
                ['datagrams/','数据报 / datagrams 概述'],
                'datagrams/definition.md',
                'datagrams/clientServer.md',
                'datagrams/broadcasting.md'
            ]
        }
    ]
}
