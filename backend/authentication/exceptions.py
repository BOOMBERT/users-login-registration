from fastapi import HTTPException, status


class IncorrectEmailOrPassword(HTTPException):
    """
    Custom exception class for indicating that an email address or password is incorrect.

        Attributes:
            STATUS_CODE (int): The HTTP status code for this exception, set to 401 Unauthorized.
            DETAIL (str): The detailed error message indicating that the email or password is incorrect.
            HEADERS (Dict[str, str]): The headers to be included in the response when this exception is raised.
    """
    STATUS_CODE = status.HTTP_401_UNAUTHORIZED
    DETAIL = "Email address or password is incorrect"
    HEADERS = {"WWW-Authenticate": "Bearer"}

    def __init__(self):
        """
        Initialize the IncorrectEmailOrPassword exception.
        """
        super().__init__(status_code=self.STATUS_CODE, detail=self.DETAIL, headers=self.HEADERS)