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
