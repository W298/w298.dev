HEADER START

Assembly Definition
Unity Assembly Definition
2023-02-21
Unity

HEADER END

# Assembly Definition

Unity 개발이 진행될수록 점점 컴파일 속도가 느려지는 것을 느낄 수 있을 것이다.  
코드 수정 시 전체 코드를 리컴파일하기 때문에 코드의 양이 많아질수록 느려지는 게 당연하다.

그래서 Assembly Definition 을 사용해 보기로 했다. Assembly Definition 을 이용하면

1. 변경된 소스코드의 Assembly 만 리컴파일하면 되기 때문에 컴파일 속도가 상승한다.
2. 상호 Assembly 간의 종속성이 Definite 해진다.

## Setup

Unity 에서 asmdef 파일을 원하는 폴더 안에 생성하면 된다.

![1](/imgs/post_imgs/unity_asm_def/1.png)

위의 경우 Universal 폴더에 있는 스크립트들을 묶기 위해서 폴더 안에 `ASM-Universal.asmdef` 파일을 생성했다.

이렇게 되면 Universal 폴더에 있는 스크립트들을 다른 스크립트가 인식을 못하게 된다. 이렇게 되면 2가지 방법이 있는데,

1. Assembly 를 적절하게 나누어 종속성이 발생하지 않도록 한다.
2. asmdef 파일에서 종속성 설정을 해준다.

1번이 이상적인 해결법이나, 코드 디자인이 항상 완벽할 수는 없기에 2번 방법을 소개하겠다.

## Reference Setup

![2](/imgs/post_imgs/unity_asm_def/2.png)

위는 Universal 폴더에 있는 스크립트를 이용하는 스크립트들인데, 미리 `ASM-DrivingScene` 으로 asmdef 파일을 생성해 두었다.

아래는 이 asmdef 파일의 속성인데, 종속성 설정은 Assembly Definition References 에서 설정하면 된다.  
여러가지 설정들이 있는데 이는 [Unity Docs](https://docs.unity3d.com/kr/current/Manual/ScriptCompilationAssemblyDefinitionFiles.html) 에 잘 설명되어 있다.

아래와 같이 종속성 설정을 해주면 그 Assembly 의 스크립트를 사용할 수 있다.

![3](/imgs/post_imgs/unity_asm_def/3.png)

## Cyclic Reference

다만 종속성 설정에서 주의해야 할 점이 있는데, Assembly Definition 에서 순환 참조는 허용되지 않는다.  
아래 그림에서 2, 4번째 예시는 순환 참조로 에러가 발생한다.

순환 참조가 발생했다면 이번 기회에 코드를 Refactor 하는 것을 추천한다.

![4](/imgs/post_imgs/unity_asm_def/4.png)
