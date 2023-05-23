from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
 
db = SQLAlchemy()
 
def get_uuid():
    return uuid4().hex
 
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class Project(db.Model):
    __tablename__ = "projectView"
    eID = db.Column(db.String(11), primary_key=True, unique=True)
    project_name = db.Column(db.String(11))
    project_number = db.Column(db.String(11))
    acquisition_date = db.Column(db.String(11))
    number_3l_code = db.Column(db.String(11))
    project_deal_type = db.Column(db.String(11))
    project_group = db.Column(db.String(11))
    project_status = db.Column(db.String(11))
    company_id = db.Column(db.String(11))
    WTG_numbers = db.Column(db.String(11))
    kW = db.Column(db.String(11))
    months_acquired = db.Column(db.String(11))

    def serialize(self):
        return {"eID": self.eID,
                "project_name": self.project_name,
                "project_number": self.project_number,
                "acquisition_date":self.acquisition_date,
                "number_3l_code": self.number_3l_code,
                "project_deal_type": self.project_deal_type,
                "project_group": self.project_group,
                "project_status": self.project_status,
                "company_id": self.company_id,
                "WTG_numbers": self.WTG_numbers,
                "kW": self.kW,
                "months_acquired": self.months_acquired
                }