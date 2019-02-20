module.exports = () => {
    return [
        '',
        {
            title: "异常",
            collapsable: true,
            children: [
                ['exceptions/','概述'],
                'exceptions/definition.md',
                'exceptions/catchOrDeclare.md',
                {
                    title: "捕获和处理异常",
                    collapsable: true,
                    children: [
                      'exceptions/handling/',
                      'exceptions/handling/try.md',
                      'exceptions/handling/catch.md',
                      'exceptions/handling/finally.md',
                      'exceptions/handling/tryResourceClose.md',
                      'exceptions/handling/putItTogether.md'
                    ]
                },
                'exceptions/declaring.md',
                {
                    title: "如何抛出异常",
                    collapsable: true,
                    children: [
                      'exceptions/throwing.md',
                      'exceptions/chained.md',
                      'exceptions/creating.md'
                    ]
                },
                'exceptions/runtime.md',
                'exceptions/advantages.md',
                'exceptions/summary.md',
                'exceptions/questions.md'
            ]
        },{
            title: "基础I/O",
            collapsable: true,
            children: [
                ['io/','概述'],
                {
                    title: "I/O流",
                    collapsable: true,
                    children: [
                      'io/streams.md',
                      'io/bytestreams.md',
                      'io/charstreams.md',
                      'io/buffers.md',
                      {
                          title: "扫描和格式化",
                          collapsable: true,
                          children: [
                            'io/scanfor.md',
                            'io/scanning.md',
                            'io/formatting.md'
                          ]
                      },
                      'io/cl.md',
                      'io/datastreams.md',
                      'io/objectstreams.md'
                    ]
                },
                {
                    title: "文件I/O (nio.2)",
                    collapsable: true,
                    children: [
                      'io/fileio.md',
                      'io/path.md',
                      'io/pathClass.md',
                      'io/pathOps.md',
                      'io/fileOps.md',
                      'io/check.md',
                      'io/delete.md',
                      'io/copy.md',
                      'io/move.md',
                      'io/fileAttr.md',
                      'io/file.md',
                      'io/rafs.md',
                      'io/dirs.md',
                      'io/links.md',
                      'io/walk.md',
                      'io/find.md',
                      'io/notification.md',
                      'io/misc.md',
                      'io/legacy.md'
                    ]
                },
                'io/summary.md',
                'io/questions.md'
            ]
        },{
            title: "并发",
            collapsable: true,
            children: [
                ['concurrency/','概述'],
                'concurrency/procthread.md',
                'concurrency/threads.md',
                'concurrency/runthread.md',
                'concurrency/sleep.md',
                'concurrency/interrupt.md',
                'concurrency/join.md',
                'concurrency/simple.md',
                'concurrency/sync.md',
                'concurrency/interfere.md',
                'concurrency/memconsist.md',
                'concurrency/syncmeth.md',
                'concurrency/locksync.md',
                'concurrency/atomic.md',
                'concurrency/liveness.md',
                'concurrency/deadlock.md',
                'concurrency/starvelive.md',
                'concurrency/guardmeth.md',
                'concurrency/immutable.md',
                'concurrency/syncrgb.md',
                'concurrency/imstrat.md',
                'concurrency/highlevel.md',
                'concurrency/newlocks.md',
                'concurrency/executors.md',
                'concurrency/exinter.md',
                'concurrency/pools.md',
                'concurrency/forkjoin.md',
                'concurrency/collections.md',
                'concurrency/atomicvars.md',
                'concurrency/threadlocalrandom.md',
                'concurrency/further.md',
                'concurrency/questions.md',
                'concurrency/answers.md'
            ]
        },{
            title: "平台环境",
            collapsable: true,
            children: [
                ['environment/','概述'],
                'environment/config.md',
                'environment/properties.md',
                'environment/cmdLineArgs.md',
                'environment/env.md',
                'environment/other.md',
                'environment/system.md',
                'environment/cl.md',
                'environment/sysprop.md',
                'environment/security.md',
                'environment/sysmisc.md',
                'environment/paths.md'
            ]
        },
        {
            title: "正则表达式",
            collapsable: true,
            children: [
                ['regex/','概述'],
                'regex/intro.md',
                'regex/test_harness.md',
                'regex/literals.md',
                'regex/char_classes.md',
                'regex/pre-char_classes.md',
                'regex/quant.md',
                'regex/groups.md',
                'regex/bounds.md',
                'regex/pattern.md',
                'regex/matcher.md',
                'regex/pse.md',
                'regex/unicode.md',
                'regex/resources.md',
                'regex/answers.md'
            ]
        }
    ]
}
