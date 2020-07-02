module.exports = () => {
  return [
    '',
    {
      title: '面向对象编程概念',
      collapsable: true,
      children: [
        ['concepts/', '概述'],
        'concepts/obgect.md',
        'concepts/class.md',
        'concepts/inheritance.md',
        'concepts/interface.md',
        'concepts/package.md',
        'concepts/qande.md'
      ]
    },
    {
      title: '语言基础',
      collapsable: true,
      children: [
        ['nutsandbolts/', '概述'],
        {
          title: '语言基础',
          collapsable: true,
          children: [
            'nutsandbolts/variables.md',
            'nutsandbolts/datatypes.md',
            'nutsandbolts/arrays.md',
            'nutsandbolts/variablesummary.md',
            'nutsandbolts/qande/variables.md'
          ]
        },
        {
          title: '运算符',
          collapsable: true,
          children: [
            'nutsandbolts/operators.md',
            'nutsandbolts/op1.md',
            'nutsandbolts/op2.md',
            'nutsandbolts/op3.md',
            'nutsandbolts/opsummary.md',
          ]
        },
        {
          title: '表达式、语句和块',
          collapsable: true,
          children: [
            'nutsandbolts/expressions.md',
            'nutsandbolts/qande/questions_expressions.md'
          ]
        },
        {
          title: '控制流程语句',
          collapsable: true,
          children: [
            'nutsandbolts/flow.md',
            'nutsandbolts/if.md',
            'nutsandbolts/switch.md',
            'nutsandbolts/while.md',
            'nutsandbolts/for.md',
            'nutsandbolts/branch.md',
            'nutsandbolts/flowsummary.md',
            'nutsandbolts/qande/questions_flow.md'
          ]
        }
      ]
    },
    {
      title: '类和对象',
      collapsable: true,
      children: [
        ['javaoo/', '概述'],
        {
          title: '类',
          collapsable: true,
          children: [
            'javaoo/classes.md',
            'javaoo/classdecl.md',
            'javaoo/variables.md',
            'javaoo/methods.md',
            'javaoo/constructors.md',
            'javaoo/arguments.md'
          ]
        },
        {
          title: '对象',
          collapsable: true,
          children: [
            'javaoo/objects.md',
            'javaoo/objectcreation.md'
          ]
        },
        {
          title: '类的更多信息',
          collapsable: true,
          children: [
            'javaoo/usingobject.md',
            'javaoo/more.md',
            'javaoo/returnvalue.md',
            'javaoo/thiskey.md',
            'javaoo/accesscontrol.md',
            'javaoo/classvars.md',
            'javaoo/initial.md',
            'javaoo/summaryclasses.md',
            'javaoo/qande/creating-questions.md',
            'javaoo/qande/objects-questions.md'
          ]
        },
        {
          title: '嵌套类',
          collapsable: true,
          children: [
            'javaoo/nested.md',
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
        }
      ]
    },
    {
      title: '注解',
      collapsable: true,
      children: [
        ['annotations/', '概述'],
        'annotations/basics.md',
        'annotations/declaring.md',
        'annotations/predefined.md',
        'annotations/type_annotations.md',
        'annotations/repeating.md',
        'annotations/qande/questions.md',
      ]
    },
    {
      title: '接口和继承',
      collapsable: true,
      children: [
        ['iandi/', '概述'],
        {
          title: '接口',
          collapsable: true,
          children: [
            'iandi/createinterface.md',
            'iandi/interface_def.md',
            'iandi/usinginterface.md',
            'iandi/interface_as_type.md',
            'iandi/nogrow.md',
            'iandi/defaultmethods.md',
            'iandi/summary_interface.md',
            'iandi/qande/interfaces_questions.md'
          ]
        },
        {
          title: '继承',
          collapsable: true,
          children: [
            'iandi/subclasses.md',
            'iandi/multipleinheritance.md',
            'iandi/override.md',
            'iandi/polymorphism.md',
            'iandi/hidevariables.md',
            'iandi/super.md',
            'iandi/objectclass.md',
            'iandi/final.md',
            'iandi/abstract.md',
            'iandi/summaryinherit.md',
            'iandi/qande/inherit_questions.md'
          ]
        }
      ]
    },
    {
      title: '数字和字符串',
      collapsable: true,
      children: [
        ['data/', '概述'],
        {
          title: '数字 Number',
          collapsable: true,
          children: [
            'data/numbers.md',
            'data/numberclasses.md',
            'data/numberformat.md',
            'data/beyondmath.md',
            'data/numbersummary.md',
            'data/qande/numbers_questions.md'
          ]
        },
        'data/characters.md',
        {
          title: '字符串 String',
          collapsable: true,
          children: [
            'data/strings.md',
            'data/converting.md',
            'data/manipstrings.md',
            'data/comparestrings.md',
            'data/buffers.md',
            'data/stringsummary.md'
          ]
        },
        'data/autoboxing.md',
        'data/qnde/characters_questions.md'
      ]
    },
    {
      title: '泛型',
      collapsable: true,
      children: [
        ['generics/', '概述'],
        'generics/why.md',
        'generics/types.md',
        'generics/rawTypes.md',
        'generics/methods.md',
        'generics/bounded.md',
        'generics/boundedTypeParams.md',
        'generics/inheritance.md',
        'generics/genTypeInference.md',
        {
          title: '通配符',
          collapsable: true,
          children: [
            'generics/wildcards.md',
            'generics/upperBounded.md',
            'generics/unboundedWildcards.md',
            'generics/lowerBounded.md',
            'generics/subtyping.md',
            'generics/capture.md',
            'generics/wildcardGuidelines.md'
          ]
        },
        {
          title: '类型擦除',
          collapsable: true,
          children: [
            'generics/erasure.md',
            'generics/genTypes.md',
            'generics/genMethods.md',
            'generics/bridgeMethods.md',
            'generics/nonReifiableVarargsType.md',
          ]
        },
        'generics/restrictions.md',
        'generics/qande/generics_questions.md'
      ]
    },
    {
      title: '包 package',
      collapsable: true,
      children: [
        ['package/', '概述'],
        'package/packages.md',
        'package/createpkgs.md',
        'package/namingpkgs.md',
        'package/usepkgs.md',
        'package/managingfiles.md',
        'package/summary_package.md'
      ]
    },
  ]
}
