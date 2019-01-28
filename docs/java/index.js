module.exports = () => {
    return [
        '',
        {
            title: "面向对象编程概念",
            collapsable: true,
            children: [
                ['concepts/','概述'],
                'concepts/obgect.md',
                'concepts/class.md',
                'concepts/inheritance.md',
                'concepts/interface.md',
                'concepts/package.md',
                'concepts/qande.md'
            ]
        },
        {
            title: "语言基础",
            collapsable: true,
            children: [
                ['nutsandbolts/','概述'],
                ['nutsandbolts/variables.md','---------- 变量 '],
                'nutsandbolts/datatypes.md',
                'nutsandbolts/arrays.md',
                'nutsandbolts/variablesummary.md',
                'nutsandbolts/qande/variables.md',
                ['nutsandbolts/operators.md','---------- 运算符 '],
                'nutsandbolts/op1.md',
                'nutsandbolts/op2.md',
                'nutsandbolts/op3.md',
                'nutsandbolts/opsummary.md',
                'nutsandbolts/expressions.md',
                'nutsandbolts/qande/questions_expressions.md',
                ['nutsandbolts/flow.md','---------- 控制流程语句 '],
                'nutsandbolts/if.md',
                'nutsandbolts/switch.md',
                'nutsandbolts/while.md',
                'nutsandbolts/for.md',
                'nutsandbolts/branch.md',
                'nutsandbolts/flowsummary.md',
                'nutsandbolts/qande/questions_flow.md'
            ]
        },
        {
            title: "类和对象",
            collapsable: true,
            children: [
                ['javaoo/','概述'],
                ['javaoo/classes.md','---------- 类 '],
                'javaoo/classdecl.md',
                'javaoo/variables.md',
                'javaoo/methods.md',
                'javaoo/constructors.md',
                'javaoo/arguments.md',
                ['javaoo/objects.md','---------- 对象 '],
                'javaoo/objectcreation.md',
                'javaoo/usingobject.md',
                ['javaoo/more.md','---------- 类的更多信息'],
                'javaoo/returnvalue.md',
                'javaoo/thiskey.md',
                'javaoo/accesscontrol.md',
                'javaoo/classvars.md',
                'javaoo/initial.md',
                'javaoo/summaryclasses.md',
                'javaoo/qande/creating-questions.md',
                'javaoo/qande/objects-questions.md',
                ['javaoo/nested.md','---------- 嵌套类'],
                'javaoo/innerclasses.md',
                'javaoo/localclasses.md',
                'javaoo/anonymousclasses.md',
                'javaoo/lambdaexpressions.md',
                'javaoo/methodreferences.md',
                'javaoo/whentouse.md',
                'javaoo/qande/nested-questions.md',
                'javaoo/enum.md',
                'javaoo/qande/enum-answers.md'
            ]
        },
    ]
}
