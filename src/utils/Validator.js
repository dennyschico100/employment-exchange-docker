const { header, body, validationResult } = require("express-validator");

const Messages = require("../constants/Messages");
const Constants = require("../constants/Constants");
const ResponseHandler = require("./ResponseHandler");

const { IS_PASSWORD, IS_STRING, IS_ARRAY, IS_BOOLEAN, IS_CERT_DATA, IS_EMAIL } =
  Constants.VALIDATION_TYPES;

// ejecuta validaciones generadas por "validate"
module.exports.checkValidationResult = function (req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const err = result.array();
  return ResponseHandler.sendErr(res, {
    code: err[0].msg.code,
    message: err[0].msg.message,
  });
};

// obtiene usuario del token
const _getUserFromToken = async function (token) {
  try {
    const data = TokenService.getTokenData(token);
    console.log(data);
    const user = await UserService.getById(data.userId);
    console.log(user);
    if (!user) throw Messages.VALIDATION.INVALID_TOKEN;
    if (Constants.DEBUGG) console.log(Messages.VALIDATION.REQUESTER_IS(user));
    return user;
  } catch (err) {
    console.log(`[Validator - _getUserFromToken] JSON.stringify(err)`);
    throw Messages.VALIDATION.INVALID_TOKEN;
  }
};

// ejecuta validacion para un parametro en particular
const _doValidate = function (param, isHead) {
  // inicializa validacion y valida existencia en caso de no ser opcional
  const createValidation = function (name, nameInHead, isOptional) {
    const section = nameInHead ? header(name) : body(name);
    if (isOptional) {
      return section.optional();
    }
    return section
      .not()
      .isEmpty()
      .withMessage(Messages.VALIDATION.DOES_NOT_EXIST(name));
  };

  // valida que el token corresponda al rol del usuario
  const validateTokenRole = function (validation, role) {
    return validation.custom(async (token) => {
      try {
        const user = await _getUserFromToken(token);
        const { profile, isAdmin } = user;
        const types = profile ? profile.types : [];
        const allowed_roles = Constants.ALLOWED_ROLES[role];

        if (!isAdmin && !types.some((role_) => allowed_roles.includes(role_))) {
          throw Messages.VALIDATION.ROLES;
        }
        return user;
      } catch (err) {
        console.error(`[Validator - validateTokenRole]: JSON.stringify(err)`);
        throw err;
      }
    });
  };

  // obtiene usuario del token y verifica que sea valido
  const validateToken = function (validation) {
    return validation.custom(async (token, { req }) => {
      try {
        const user = await _getUserFromToken(token);
        // eslint-disable-next-line eqeqeq
        if (req.params.userId && req.params.userId != user._id) {
          throw Messages.VALIDATION.INVALID_TOKEN;
        }
        return user;
      } catch (err) {
        console.error(`[Validator - validateToken]: JSON.stringify(err)`);
        throw err;
      }
    });
  };

  // valida que el campo sea un string
  const validateIsString = function (validation, parameter) {
    return validation
      .isString()
      .withMessage(Messages.VALIDATION.STRING_FORMAT_INVALID(parameter.name));
  };
  const validateIsEmail = function (validation, parameter) {
    return validation
      .isEmail()
      .withMessage(Messages.VALIDATION.EMAIL_FORMAT_INVALID(parameter.name));
  };

  // valida que el campo sea un array
  const validateIsArray = function (validation, parameter) {
    return validation.custom(async (value) => {
      if (Array.isArray(value)) {
        return value;
      }
      throw Messages.VALIDATION.BOOLEAN_FORMAT_INVALID(parameter.name);
    });
  };

  // valida que el campo sea un boolean
  const validateIsBoolean = function (validation, parameter) {
    return validation.custom(async (value) => {
      if (
        value === "true" ||
        value === true ||
        value === "false" ||
        value === false
      ) {
        return value;
      }
      throw Messages.VALIDATION.BOOLEAN_FORMAT_INVALID(parameter.name);
    });
  };

  // valida que el campo no este en la lista de contraseñas comunes
  const validatePasswordIsNotCommon = function (validation) {
    return validation
      .not()
      .isIn(Constants.COMMON_PASSWORDS)
      .withMessage(Messages.VALIDATION.COMMON_PASSWORD);
  };

  // valida que los tipos de datos sean los correctos
  const validateTemplateData = function (validation, parameter) {
    return validation.custom((data) => {
      try {
        if (!data)
          throw Messages.VALIDATION.TEMPLATE_DATA.NO_DATA(parameter.name);

        let dataJson;
        try {
          dataJson = JSON.parse(data);
        } catch (err) {
          throw Messages.VALIDATION.TEMPLATE_DATA.INVALID_TYPE(parameter.name);
        }

        for (const type of Object.values(Constants.DATA_TYPES)) {
          for (const dataElement of dataJson[type]) {
            // si falta alguno de los campos
            const missingField =
              !dataElement || !dataElement.name || !dataElement.type;
            if (missingField)
              throw Messages.VALIDATION.TEMPLATE_DATA.INVALID_DATA(
                parameter.name
              );

            // si es de un tipo invalido
            const invalidType = !Constants.CERT_FIELD_TYPES[dataElement.type];
            if (invalidType)
              throw Messages.VALIDATION.TEMPLATE_DATA.INVALID_TYPE(
                parameter.name
              );

            // si es de tipo checkbox, tiene opciones
            const checkboxMissingOptions =
              !dataElement.options &&
              dataElement.type === Constants.CERT_FIELD_TYPES.Checkbox;
            if (checkboxMissingOptions)
              throw Messages.VALIDATION.TEMPLATE_DATA.MISSING_CHECKBOX_OPTIONS(
                parameter.name
              );
          }
        }

        return data;
      } catch (err) {
        console.log(`[Validator - validateTemplateData] JSON.stringify(err)`);
        throw err;
      }
    });
  };

  // valida que los tipos de datos sean validos
  const validateTemplateDataType = function (validation) {
    return validation.custom((data) => {
      try {
        if (Object.values(Constants.DATA_TYPES).indexOf(data) < 0)
          throw Messages.VALIDATION.TEMPLATE_DATA_TYPE.INVALID_DATA_TYPE(data);
        return data;
      } catch (err) {
        console.log(
          `[Validator - validateTemplateDataType] JSON.stringify(err)`
        );
        throw err;
      }
    });
  };

  // valida que los valores se correspondan al tipo
  const validateValueMatchesType = async function (type, value, err) {
    switch (type) {
      case Constants.CERT_FIELD_TYPES.Boolean:
        if (value !== "true" && value !== "false") throw err;
        break;
      case Constants.CERT_FIELD_TYPES.Date:
        const date = new Date(value);
        const regex =
          /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(0[0-9]|1[0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z)/;
        if (!date.toISOString().match(regex)) throw err;
        break;
      case Constants.CERT_FIELD_TYPES.Number:
        if (Number.isNaN(value)) throw err;
        break;
      case Constants.CERT_FIELD_TYPES.Paragraph:
        if (!value) throw err;
        break;
      case Constants.CERT_FIELD_TYPES.Text:
        if (!value) throw err;
        break;
      default:
        throw new Error(
          "[validateValueMatchesType] Should not drop in default value"
        );
    }
    return value;
  };

  // valida que los valores sean validos
  const validateValueTypes = function (validation, parameter) {
    return validation.custom(async (value, { req }) => {
      try {
        let data;

        try {
          data = JSON.parse(req.body.data);
        } catch (err) {
          throw Messages.VALIDATION.TEMPLATE_DATA.INVALID_TYPE(parameter.name);
        }

        // sin tipo
        if (!data[0] || !data[0].type)
          throw new Error("[validateValueTypes] Invalid data type");

        const { type } = data[0];
        for (const dataElement of data) {
          const err =
            Messages.VALIDATION.TEMPLATE_DATA_VALUE.INVALID_DATA_VALUE(
              dataElement.name
            );

          // que el tipo sea el correcto
          if (!dataElement.type || type !== dataElement.type) throw err;

          // si es checkbox, que este entre las opciones
          if (
            type === Constants.CERT_FIELD_TYPES.Checkbox &&
            !dataElement.options.includes(value)
          )
            throw err;
        }

        // validar datos si estan o son requeridos
        if (data[0].required || value)
          await validateValueMatchesType(
            type,
            value,
            new Error("[validateValueTypes] types don't match")
          );
        return value;
      } catch (err) {
        console.log(`[Validator - validateValueTypes]: JSON.stringify(err)`);
        throw err;
      }
    });
  };

  //Oferta de empleo
  // validar seccion del certificado comparandola con la del modelo
  const _doValidateValueInTemplate = async function (
    dataSection,
    templateDataSection
  ) {
    try {
      for (const elem of dataSection) {
        const template = templateDataSection.find((t) => t.name === elem.name);
        if (!template) {
          // el campo no esta en el template
          throw Messages.VALIDATION.CERT_DATA.EXTRA_ELEMENT(elem.name);
        }
        const err = Messages.VALIDATION.TEMPLATE_DATA_VALUE.INVALID_DATA_VALUE(
          elem.name
        );

        // validar datos si estan o son requeridos
        if (elem.required || elem.value)
          await validateValueMatchesType(template.type, elem.value, err);
      }

      const allNames = dataSection.map((elem) => elem.name);

      for (const elem of templateDataSection) {
        if (elem.required && allNames.indexOf(elem.name) < 0) {
          // el campo esta en el template y es requerido, pero no esta
          throw Messages.VALIDATION.MISSING_ELEMENT(elem.name);
        }
      }
    } catch (err) {
      console.log(
        `[Validator - _doValidateValueInTemplate]: JSON.stringify(err)`
      );
      throw err;
    }
  };

  let validation = createValidation(param.name, isHead, param.optional);

  if (param.validate && param.validate.length) {
    param.validate.forEach((validationType) => {
      switch (validationType) {
        case Constants.TOKEN_MATCHES_USER_ID:
          validation = validateToken(validation);
          break;
        case Constants.USER_TYPES[validationType]:
          validation = validateTokenRole(
            validation,
            Constants.USER_TYPES[validationType]
          );
          break;
        case IS_PASSWORD:
          validation = validatePasswordIsNotCommon(validation);
          break;
        case IS_STRING:
          validation = validateIsString(validation, param);
          break;
        case IS_EMAIL:
          validation = validateIsEmail(validation, param);
          break;
        case IS_ARRAY:
          validation = validateIsArray(validation, param);
          break;
        case IS_BOOLEAN:
          validation = validateIsBoolean(validation, param);
          break;

        default:
          throw new Error("Should not drop in default case");
      }
    });
  }

  if (param.length) {
    validation
      .isLength(param.length)
      .withMessage(
        Messages.VALIDATION.LENGTH_INVALID(
          param.name,
          param.length.min,
          param.length.max
        )
      );
  }

  return validation;
};

// recibe una lista de parámetros de validacion y valida que los datos recibidos en el body y header
// cumplan con esos parametros
module.exports.validate = function (params) {
  const validations = [];
  params.forEach((param) => {
    const validation = _doValidate(param, param.isHead);
    validations.push(validation);
  });
  return validations;
};
