# 随堂作业：
> 把课上老师的脑图里的这些实体补全
> 你能不能在 ECMA 中找到所有的类型（Type）

# 本周作业
> 在2. 重学 | 构建知识体系这节课上，老师所列的知识体系的脑图，自己根据老师所教授的追溯法，并通过理解将其补充完整，形成自己的知识体系（同时还有本周的学习总结）。





## 实体补全

> 仅统计了HTML4 规范中  Character entity references （字符实体引用）
>
> 资料地址： [ Character entity references in HTML 4](https://www.w3.org/TR/html4/sgml/entities.html)

### Character entity references for ISO 8859-1 characters(共96个)

```
- 

<!-- Character entity set. Typical invocation:
     <!ENTITY % HTMLlat1 PUBLIC
       "-//W3C//ENTITIES Latin 1//EN//HTML">
     %HTMLlat1;
-->
nbsp
iexcl
cent
pound
curren
yen
brvbar
sect
uml
copy
ordf
laquo
not
shy
reg
macr
deg
plusmn
sup2
sup3
acute
micro
para
middot
cedil
sup1
ordm
raquo
frac14
frac12
frac34
iquest
Agrave
Aacute
Acirc
Atilde
Auml
Aring
AElig
Ccedil
Egrave
Eacute
Ecirc
Euml
Igrave
Iacute
Icirc
Iuml
ETH
Ntilde
Ograve
Oacute
Ocirc
Otilde
Ouml
times
Oslash
Ugrave
Uacute
Ucirc
Uuml
Yacute
THORN
szlig
agrave
aacute
acirc
atilde
auml
aring
aelig
ccedil
egrave
eacute
ecirc
euml
igrave
iacute
icirc
iuml
eth
ntilde
ograve
oacute
ocirc
otilde
ouml
divide
oslash
ugrave
uacute
ucirc
uuml
yacute
thorn
yuml
```

### Character entity references for symbols, mathematical symbols, and Greek letters（共124个）

```
fnof
Alpha
Beta
Gamma
Delta
Epsilon
Zeta
Eta
Theta
Iota
Kappa
Lambda
Mu
Nu
Xi
Omicron
Pi
Rho
Sigma
Tau
Upsilon
Phi
Chi
Psi
Omega
alpha
beta
gamma
delta
epsilon
zeta
eta
theta
iota
kappa
lambda
mu
nu
xi
omicron
pi
rho
sigmaf
sigma
tau
upsilon
phi
chi
psi
omega
thetasym
upsih
piv
bull
hellip
prime
Prime
oline
frasl
weierp
image
real
trade
alefsym
larr
uarr
rarr
darr
harr
crarr
lArr
uArr
rArr
dArr
hArr
forall
part
exist
empty
nabla
isin
notin
ni
prod
sum
minus
lowast
radic
prop
infin
ang
and
or
cap
cup
int
there4
sim
cong
asymp
ne
equiv
le
ge
sub
sup
nsub
sube
supe
oplus
otimes
perp
sdot
lceil
rceil
lfloor
rfloor
lang
rang
loz
spades
clubs
hearts
diams
```

### Character entity references for markup-significant and internationalization characters(共32个)

```
quot
amp
lt
gt
OElig
oelig
Scaron
scaron
Yuml
circ
tilde
ensp
emsp
thinsp
zwnj
zwj
lrm
rlm
ndash
mdash
lsquo
rsquo
sbquo
ldquo
rdquo
bdquo
dagger
Dagger
permil
lsaquo
rsaquo
euro
```



## 你能不能在 ECMA 中找到所有的类型（Type）

> 在 es标准文档 6.2 ECMAScript Specification Types

> The specification types include Reference, List, Completion,
> Property Descriptor, Lexical Environment, Environment Record, and Data Block. 
>
> 七种 build-in types
>
> 1. Number
> 2. String
> 3. Boolean
> 4. undefined
> 5. null
> 6. Symbol
> 7. Object
>
> 共七种特殊类型
>
> 1. Reference
> 2. List
> 3. Completion
> 4. Property Descriptor
> 5.  Lexical Environment
> 6.  Environment Record
> 7.  Data Block