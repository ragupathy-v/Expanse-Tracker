from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session 
from fastapi.responses import JSONResponse

from sqlalchemy import func

from pydantic_model import expense_pydantic,category_pydantic
from database import engine, base,get_db
from database_model import Expense,Category
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

base.metadata.create_all(engine)




@app.post("/addexpense")
def create_expense(expense:expense_pydantic,db:Session=Depends(get_db)):

    category=db.query(Category).filter(Category.category==expense.category).first()

    if category is None:
        category=Category(category=expense.category)
        db.add(category)
        db.commit()
        db.refresh(category)
        
    
    new_expense=Expense(note=expense.note,amount=expense.amount,date=expense.date,category_id=category.id)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return{"message":" new expense is Added","expense":new_expense}


    



@app.get("/getexpense")
def get_expence(db:Session=Depends(get_db)):
    
    expense=db.query(Expense).all()

    expense=[
        {
            "id":item.id,
         "note":item.note,
         "amount":item.amount,
         "category":item.category.category
         }

        for item in expense
    ]

    return {"expense":expense}


@app.get("/summary")
def summary(db:Session=Depends(get_db)):
    
    total_expense=db.query(Expense.amount).all()

    #converting amount in list to fing the total expense
    amount_list=[row[0] for row in total_expense]
    print(amount_list)
    total_expense=sum(amount_list)

    #total amount by category
    category_expence=db.query(
        Category.category, 
        func.sum(Expense.amount)
    ).join(
        Expense, Expense.id==Category.id
    ).group_by(
        Category.category)

    print(category_expence)
    category_wise=[
        {
            "category":category,
            "amount":amount,
        }
        for category,amount in category_expence
    ]

    # categorys=db.query(Expense.category,Expense.amount).all()
    # category=[i[0] for i in categorys]
    # category=list(dict.fromkeys(category))
    

    return {"total_expense":total_expense,"category_wise":category_wise}