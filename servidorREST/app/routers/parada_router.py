from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from model import Parada, ParadaUpdate
import requests

router = APIRouter()


'''CREATE Parada'''
@router.post("/", response_description="Create a new Parada", status_code=status.HTTP_201_CREATED, response_model=Parada)
def create_Parada(request: Request, Parada: Parada = Body(...)):

    Parada = jsonable_encoder(Parada)

    new_Parada = request.app.database["parada"].insert_one(Parada)
    created_Parada = request.app.database["parada"].find_one(
        {"_id": new_Parada.inserted_id}
    )

    return created_Parada


'''LIST PARADAS'''
@router.get("/", response_description="List all Paradas", response_model=List[Parada])
def list_Paradas(request: Request):
    Paradas = list(request.app.database["parada"].find(limit=100))
    return Paradas


'''DELETE ALL PARADAS'''


@router.delete("/delete_all", response_description="Delete all Paradas")
def delete_all_Paradas(request: Request, response: Response):
    Parada_deleted = request.app.database["parada"].delete_many({})

    if Parada_deleted.deleted_count:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Paradas not found")


'''DELETE PARADAS'''


@router.delete("/{id}", response_description="Delete an Parada")
def delete_Parada(id: str, request: Request, response: Response):
    Parada_deleted = request.app.database["parada"].delete_one({
                                                                     "id": id})

    if Parada_deleted.deleted_count:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"parada with ID {id} not found")


'''UPDATE PARADAS'''
@router.put("/{id}", response_description="Update an Parada", response_model=Parada)
def update_Parada(id: str, request: Request, data: ParadaUpdate = Body(...)):

    Parada = {k: v for k, v in data.dict().items() if v is not None}

    if len(Parada) >= 1:
        update_result = request.app.database["parada"].update_one(
            {"id": id}, {"$set": Parada}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Parada with ID {id} not found")

    if (
        existing_Parada := request.app.database["parada"].find_one({"id": id})
    ) is not None:
        return existing_Parada

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Parada with ID {id} not found")

'''LIST PARADAS COD LINEA SENTIDO'''
@router.get("/{codLinea}/{sentido}", response_description="List all Paradas codLinea sentido", response_model=List[Parada])
def list_Paradas(codLinea: int, sentido: int, request: Request):
    Paradas = list(request.app.database["parada"].find({"codLinea":codLinea, "sentido":sentido}))
    return Paradas