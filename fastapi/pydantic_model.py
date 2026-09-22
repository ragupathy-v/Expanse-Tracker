from pydantic import BaseModel,Field
from datetime import date


class category_pydantic(BaseModel):
    category:str


class expense_pydantic(BaseModel):

    note:str
    amount:float=Field(gt=0)
    date:date
    category:str

    


