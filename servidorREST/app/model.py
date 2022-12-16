from datetime import date, datetime
from lib2to3.pgen2.token import OP
import uuid
from pydantic import BaseModel, Field, ValidationError, validator, root_validator
from typing import Union, List, Optional
from datetime import date

class Date(BaseModel):
    date: datetime = Field(alias="$date", default=datetime.now())

class GeoJson(BaseModel):
    type : str
    coordinates : List[float]
    @validator('type')
    def type_must_be_point(cls, v):
        if v != "Point":
            raise ValueError("Type must be Point")
        return v
    @validator('coordinates')
    def coordinates_must_be_list_of_floats(cls, v):
        if len(v) != 2:
            raise ValueError("Coordinates must be a list of 2 floats")
        for i in v:
            if type(i) != float:
                raise ValueError("Coordinates must be a list of 2 floats")
        return v

class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="id")
    first_name: str
    last_name: str
    email: str
    @validator("email")
    def email_must_be_valid(cls, v):
        if not '@' in v:
            raise ValueError('email must be valid')
        return v

class Example(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="id")
    string: str
    integer: int
    float: float
    email_user: str
    @validator("email_user")
    def email_must_be_valid(cls, v):
        if not '@' in v:
            raise ValueError('email must be valid')
        return v

class ExampleUpdate(BaseModel):
    string: Optional[str]
    integer: Optional[int]
    float: Optional[int]
    email_user: Optional[str]