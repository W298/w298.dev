HEADER START

Assembly Definition
Unity Assembly Definition
2023-02-21
Unity

HEADER END

# Assembly Definition

Unity 개발에서 전체 스크립트 양이 많아지면,
코드 수정 시 전체 코드를 리컴파일해야 하기 때문에 컴파일 속도가 느려진다.

이는 Unity 기능 중 하나인 Assembly Definition 을 사용해 해결할 수 있다.  
Assembly Definition 을 이용하면,

1. 변경된 소스코드의 Assembly 만 리컴파일하면 되기 때문에 컴파일 속도가 상승한다.  
   물론 종속 Assembly 가 존재한다면 그 Assembly도 같이 리컴파일해야 할 것이다.
2. 상호 Assembly 간의 종속성이 명확해진다.

## Setup

Unity Editor 에서 Assembly Definition (\*.asmdef) 파일을 원하는 폴더 안에 생성한다.

![1](/imgs/post_imgs/unity_asm_def/1.png)

위의 경우 Universal 폴더에 있는 스크립트들을 지정하기 위해서 폴더 안에 `ASM-Universal.asmdef` 파일을 생성했다.

![4](/imgs/post_imgs/unity_asm_def/4.png)

Universal 폴더에 있는 스크립트들은 위와 같이 하나의 Assembly 로 묶여있는 것을 확인할 수 있다.

Assembly Definition 파일을 만들면 지정한 이름으로 솔루션이 분리된다.  
이렇게 되면 Universal 폴더에 있는 스크립트들을 다른 스크립트가 인식을 못한다.

Universal 폴더에 있는 스크립트를 참조하는 스크립트는 Assembly Definition 파일을 만들고, 아래와 같이 Reference 설정을 해야 한다.

## Reference 설정

![2](/imgs/post_imgs/unity_asm_def/2.png)

위는 Universal 폴더에 있는 스크립트를 참조하는 스크립트들이다.  
미리 `ASM-DrivingScene.asmdef` 으로 Assembly Definition 파일을 생성해 두었다.

아래는 이 asmdef 파일의 속성인데, 종속성 설정은 Assembly Definition References 에서 설정하면 된다.  
여러가지 설정들이 있는데 이는 [Unity Docs](https://docs.unity3d.com/kr/current/Manual/ScriptCompilationAssemblyDefinitionFiles.html) 에 잘 설명되어 있다.

아래와 같이 종속성 설정을 해주면 그 Assembly 의 스크립트를 참조할 수 있다.  
GUID 옵션을 켜주면 파일명이 변경되어도 사용할 수 있다.

![3](/imgs/post_imgs/unity_asm_def/3.png)

## Cyclic Reference

다만 Reference 설정에서 주의해야 할 점이 있는데, Assembly Definition 에서 _순환 참조는 허용되지 않는다._

순환 참조가 아닌 경우

1. A -> B (A가 B를 참조)
2. A -> B -> C / A -> C

순환 참조인 경우

1. A <-> B (A와 B가 서로 참조)
2. A -> B -> C -> A (꼬리에 꼬리를 무는 형태)
