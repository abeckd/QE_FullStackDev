def serialize_model(model):
    if isinstance(model, list):
        return [item.serialize() for item in model]
    else:
        return model.serialize()
