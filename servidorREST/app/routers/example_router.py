from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from model import Example, ExampleUpdate
import requests

router = APIRouter()


'''CREATE EXAMPLE'''
@router.post("/", response_description="Create a new example", status_code=status.HTTP_201_CREATED, response_model=Example)
def create_example(request: Request, example: Example = Body(...)):

    example = jsonable_encoder(example)

    new_example = request.app.database["example"].insert_one(example)
    created_example = request.app.database["example"].find_one(
        {"_id": new_example.inserted_id}
    )

    return created_example


'''LIST EXAMPLES'''
@router.get("/", response_description="List all examples", response_model=List[Example])
def list_examples(request: Request):
    examples = list(request.app.database["example"].find(limit=100))
    return examples


'''LIST EXAMPLES WITH STR'''
@router.get("/{id}", response_description="Get examples with str", response_model=List[Example])
def list_examples_with_str(str: str, request: Request):
    examples = list(request.app.database["example"].find({"string": str}, limit=100))
    return examples


'''DELETE ALL EXAMPLES'''


@router.delete("/delete_all", response_description="Delete all examples")
def delete_all_examples(request: Request, response: Response):
    example_deleted = request.app.database["example"].delete_many({})

    if example_deleted.deleted_count:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Examples not found")


'''DELETE EXAMPLE'''


@router.delete("/{id}", response_description="Delete an example")
def delete_example(id: str, request: Request, response: Response):
    example_deleted = request.app.database["example"].delete_one({
                                                                     "id": id})

    if example_deleted.deleted_count:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Example with ID {id} not found")


'''UPDATE EXAMPLE'''
@router.put("/{id}", response_description="Update an example", response_model=Example)
def update_example(id: str, request: Request, data: ExampleUpdate = Body(...)):

    example = {k: v for k, v in data.dict().items() if v is not None}

    if len(example) >= 1:
        update_result = request.app.database["example"].update_one(
            {"id": id}, {"$set": example}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Example with ID {id} not found")

    if (
        existing_example := request.app.database["example"].find_one({"id": id})
    ) is not None:
        return existing_example

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Example with ID {id} not found")


'''LIST EXAMPLES OF A USER'''


@router.get("/filter/{email}", response_description="Get the list of examples of a user", response_model=List[Example])
def list_examples_by_user(email: str, request: Request, response: Response):

    examples = list(request.app.database["example"].find(
        {"email_user": email}, limit=100))

    return examples