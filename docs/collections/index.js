module.exports = () => {
    return [
        '',
        'intro.md',
        {
            title: "接口",
            collapsable: true,
            children: [
                ['interfaces/','概述'],
                'interfaces/collection.md',
                'interfaces/set.md',
                'interfaces/list.md',
                'interfaces/queue.md',
                'interfaces/deque.md',
                'interfaces/map.md',
                'interfaces/objectOrdering.md',
                'interfaces/sortedSet.md',
                'interfaces/sortedMap.md',
                'interfaces/summary.md',
                'interfaces/qande/questions.md'
            ]
        },
        {
            title: "聚合操作",
            collapsable: true,
            children: [
                ['streams/','概述'],
                'streams/reduction.md',
                'streams/parallelism.md',
                'streams/qande/questions.md'
            ]
        },
        {
            title: "实现",
            collapsable: true,
            children: [
                ['implementations/','概述'],
                'implementations/set.md',
                'implementations/list.md',
                'implementations/map.md',
                'implementations/queue.md',
                'implementations/deque.md',
                'implementations/wrapper.md',
                'implementations/Convenience.md',
                'implementations/summary.md',
                'implementations/qande/questions.md',
            ]
        },
        'algorithms.md',
        'custom-implementations.md',
        {
            title: "互操作性",
            collapsable: true,
            children: [
                'interoperability/compatibility.md',
                'interoperability/api-design.md',
            ]
        },
    ]
}
