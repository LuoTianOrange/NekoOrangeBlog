# 列表
1 创建  
list1 = [1,'b','c']

2 转换  
cat = (1,2,3)  
dog = list(cat)  

3 删除  
del list #删除整个列表  
list.remove(A) #删除列表的A元素  
list.pop(index) #删除index下标的元素  

4 增加  
list.append(A) #在列表尾部添加A元素  
list.insert(index,A) #在index位置添加A元素  
list.extend(list2) #在列表尾部添加列表list2  

5 查询x出现几次  
list. count(x)  

6 排序  
list. sort() #默认从小到达排序
list. sort(reverse=True) #从大到小排序  

7 翻转  
list. reverse()  

8 查询列表长度  
len(list)  

9 访问摸个下标的元素  
list [下标]  

10 复制列表元素  
list2=list. copy()
举例:
list=[1,2,3,1,1]
list2=list. copy()
打印list2结果为: [1, 2, 3, 1, 1]  

11 判断某个元素是否在列表里面  
x in list #返回True或False

#  字符串
用 'a' ''a''或 '''a'''表示  
使用[ ]获取字符串中一个或多个字符
- 索引：返回字符串中单个字符	<字符串>[M]  
"请输入带有符号的温度值: "[0]	或者TempStr[-1]
- 切片：返回字符串中一段字符子串  <字符串>[M: N]  
  "请输入带有符号的温度值: "[1:3] 或者 TempStr[0:-1]  
- 使用[M: N: K]根据步长对字符串切片  
转义符 \   - 转义符表达特定字符的本意  
转义符形成一些组合，表达一些不可打印的含义  
"\b"回退	"\n"换行(光标移动到下行首)	"\r" 回车(光标移动到本行首)

## 字符串操作符  
x + y  #连接两个字符x和y  
n * x  #或 x * n  #复制n次x  
x in s   #如果x在s里返回True,否则返回False

## 字符串处理函数  
len(x)  #返回字符串中x的长度  
str(x)  #任意类型x对应的字符串形式  
hex(x) 或 oct(x)  #整数x的十六进制或八进制小写形式字符串  

## 字符串处理方法  
chr(u)  #u为Unicode编码，返回其对应的字符  
ord(u)  #x为字符，返回其对应的Unicode编码  
str.lower(x)  #返回字符串x的副本,并将所有字符转换为小写
str.upper(x)  #返回字符串x的副本,并将所有字符转换为大写
str.split(sep=None)  #返回一个列表，由str 根据sep被分隔的部分组成  
例："A,B,C".split(",")结果为[A',B';C]   
str.count(sub)  #返回子串sub在str中出现的次数  
str.replace(old,new)  #返回str副本，所有old子串替换为new
str.center(width,[,fillchar])   #字符串str根据宽度width居中，fillchar可选
str.strip(chars)  #从str中去掉在其左侧和右侧chars中列出的字符  
str.join(item)  #在item变量后除最后元素外每个元素后添加一个str","   

# 分支  
if...else...  
### 保留字  
x and y  两个条件x和y的逻辑与  
x or y  两个条件x和y的逻辑或  
not x  条件x的逻辑非  

# 循环
for i in x:  
for i in range(1,100):  
while True:  
### 保留字
break跳出并结束当前整个循环，执行循环后的语句  
continue结束当次循环，继续执行后续次数循环  
break和continue可以与for和while循环搭配使用  

# time和random库  
时间获取：time()	ctime()	gmtime()  
时间格式化：strftime()	strptime()  
程序计时：sleep(), perf_counter()  
基本随机数函数： seed(), random()  
扩展随机数函数： randint(), getrandbits(), uniform(),  
randrange(), choice(), shuffle()  
sleep(s)  程序将等待s秒后退出  
seed(a=None)  初始化给定的随机数种子，默认为当前系统时间  
random()  生成一个[0.0, 1.0)之间的随机小数  
randint(a, b)  生成一个[a, b]之间的整数  
randrange(m, n[, k])  生成一个[m, n)之间以k为步长的随机整数  
getrandbits(k)  生成一个k比特长的随机整数  
uniform(a, b)  生成一个[a, b]之间的随机小数
choice(seq)  从序列seq中随机选择一个元素  
shuffle(seq)  将序列seq中元素随机排列，返回打乱后的序列  

# 集合  
集合用{}和set()创建
元组用()和tuple()创建，列表用[]和list()创建，字典dirt{ 'x'':'y'}
元组用于元素不改变的应用场景，更多用于固定搭配场景  
列表更加灵活，它是最常用的序列类型  
最主要作用：表示一组有序数据，进而操作它们，元素遍历数据保护，如果不希望数据被程序所改变，转换成元组类型。  

# 函数
def def	<函数名>(<参数(0个或多个)>):  
<函数体>  
return	<返回值>  

函数定义时可以为某些参数指定默认值，构成可选参数。  
def	<函数名>(<非可选参数>,	<可选参数>)	:  
<函数体>  
return	<返回值>  

函数定义时可以设计可变数量参数，即：不确定参数总数量  
def	<函数名>(<参数>,	*b	):  
<函数体>  
return	<返回值>  

规则1: 局部变量和全局变量是不同变量  
局部变量是函数内部的占位符，与全局变量可能重名但不同  
函数运算结束后，局部变量被释放  
可以使用global保留字在函数内部使用全局变量  

规则2: 局部变量为组合数据类型且未创建，等同于全局变量

基本数据类型，局部变量与全局变量不同  
可以通过global保留字在函数内部声明全局变量  
组合数据类型，如果局部变量未真实创建，则是全局变量  

lambda函数  
<函数名>	=	lambda	<参数>:	<表达式>  
等价于  
def	<函数名>(<参数>)	:  
<函数体>  
return	<返回值>  

递归的实现  
递归本身是一个函数，需要函数定义方式描述 函数内部，采用分支语句对输入参数进行判断基例和链条，分别编写对应代码  

# 文件操作
文件打开  
<变量名> = open( <文件名> , <打开方式>)  

打开模式  
'r':只读模式，默认值，如果文件不存在，返回FileNotFoundError  
'w':覆盖写模式，文件不存在则创建，存在则完全覆盖  
'x':创建写模式，文件不存在则创建，存在则返回FileExistsError  
'a':追加写模式，文件不存在则创建，存在则在文件最后追加内容  
'b':二进制文件模式  
't':文本文件模式，默认值  
'+':与r/w/x/a一同使用，在原功能基础上增加同时读写功能  

文件内容读取
<f>.read(size=-1)  ：读入全部内容，如果给出参数，读入前size长度  
<f>.readline(size=-1)  ：读入一行内容，如果给出参数，读入该行前size长度  
<f>.readlines(hint=-1)  ：读入文件所有行，以每行为元素形成列表 如果给出参数，读入前hint行  

文件内容写入  
<f>.write(s)  向文件写入一个字符串或字节流  
<f>.writelines(lines)  将一个元素全为字符串的列表写入文件  
<f>.seek(offset)  ：改变当前文件操作指针的位置，offset含义如下：
0 – 文件开头； 1 – 当前位置； 2 – 文件结尾

# 错误与异常  
try-except语句用于捕获程序运行时的异常  
raise语句后可以添加具体的异常类，从而引发相应的异常。  
raise语句后若不添加任何内容，可重新引发刚才发生的异常。  
assert断言语句用于判定一个表达式是否为真，如果表达式为True，不做任何操作，否则引发AssertionError异常。  
assert 表达式[,参数]    
表达式是assert语句的判定对象，参数通常是一个自定义异常或显示异常描述信息的字符串。  
with语句适用于对资源进行访问的场合，无论资源在使用过程中是否发生异常，都可以使用with语句保证执行释放资源操作。  
with表达式其实是try-finally的简写形式 ，但是又不是全相同。  
Python允许程序开发人员自定义异常。自定义异常类的方法很简单，只需创建一个类，让它继承Exception类或其它异常类即可。

# turtle库  
画笔控制函数  
turtle.penup()&turtle.pu()  ：抬起画笔  
turtle.pendown()&turtle.pd()  ：放下画笔  
turtle.pensize(width)&turtle.width(width)  ：设置画笔宽度  
turtle.color  ：设置画笔颜色  
turtle.forward(d)&turtle.fd(d)   ：向前行进，走直线 d: 行进距离，可以为负数  
turtle.circle(r,extent=None)  ：根据半径r绘制extent角度的弧形， extent: 绘制角度，默认是360度整圆  
turtle.setheading(angle)&turtle.seth(angle)  ：改变行进方向，angle: 行进方向的绝对角度  
turtle.left(angle)  ：向左转  
turtle.right(angle)   ：向右转  
turtle.circle(radius,extent=None,step=none)  ：根据半径radius绘制extent角度的弧形 ，radius ：圆半径，extent ：弧形角度（弧形所对的圆心角）  
begin_fill():在填充图形之前调用  
end_fill():在填充图形之后调用，表示填充颜色结束  
fillcolor() 填充颜色  
filling():返回填充的状态，True表示已填充，False表示没有填充  
clear():清空当前窗口，但不改变当前画笔的位置  
reset():清空当前窗口，并把所有状态重置为默认值  

