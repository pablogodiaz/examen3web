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

class Parada(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="id")
    codLinea: int
    nombreLinea: str
    sentido: int
    orden: int
    codParada: int
    nombreParada: str
    direccion: str
    lon: float
    lat: float

class ParadaUpdate(BaseModel):
    codLinea: Optional[int]
    nombreLinea: Optional[str]
    sentido: Optional[int]
    orden: Optional[int]
    codParada: Optional[int]
    nombreParada: Optional[str]
    direccion: Optional[str]
    lon: Optional[float]
    lat: Optional[float]