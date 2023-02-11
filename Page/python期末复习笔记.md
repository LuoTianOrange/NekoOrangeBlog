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
