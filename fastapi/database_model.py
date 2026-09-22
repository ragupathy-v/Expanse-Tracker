from sqlalchemy import Column,Integer,String,Float,Date,ForeignKey
from sqlalchemy.orm import relationship
from database import base


class Category(base):
    __tablename__="category"

    id=Column(Integer,primary_key=True,nullable=True,index=True)
    category=Column(String,nullable=False,unique=True)
    

class Expense(base):
    __tablename__="expense"

    id=Column(Integer,primary_key=True,nullable=True,index=True)
    note=Column(String)
    amount=Column(Float, nullable=False)
    date=Column(Date)
    category_id=Column(Integer,ForeignKey("category.id"),nullable=False)

    category=relationship("Category")
   