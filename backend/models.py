from sqlalchemy import Column, Integer, String

from backend.database.configuration import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    hashed_refresh_token = Column(String, default=None)
