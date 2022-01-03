const CodeError = require('../CodeError');

module.exports = {
  INDEX: {
    ERR: {
      CONNECTION: Error('Error de conexion en la base de datos: '),
    },
    MSG: {
      CONNECTING: 'conectandose a: ',
      CONNECTED: 'Base de datos conectada.',
      HELLO_WORLD: 'Hola !',
      RUNNING_ON: 'Ejecutandose en puerto ',
    },
  },
  REGISTER: {
    ERR: {
      CREATE: new CodeError({
        code: 'REGISTER_CREATE',
        message: 'El registro no pudo ser creado.',
      }),
      NOT_EXIST: new CodeError({
        code: 'NOT_EXIST',
        message: 'El registro no existe',
      }),
      EDIT: new CodeError({
        code: 'REGISTER_EDIT',
        message:
          'El modelo de registro no pudo ser editado. Verifique que el registro haya sido creado con éxito.',
      }),
      GET: new CodeError({
        code: 'REGISTER_GET',
        message: 'El registro no pudo ser obtenido.',
      }),
      STATUS: new CodeError({ code: 'STATUS', message: 'El status no existe' }),
      RETRY: new CodeError({
        code: 'RETRY',
        message: 'Hubo un error al intentar validar el registro.',
      }),
      INVALID_STATUS: new CodeError({
        code: 'INVALID_STATUS',
        message:
          'No se puede realizar esta acción con el estado actual del registro.',
      }),
      STATUS_NOT_VALID: new CodeError({
        code: 'STATUS_NOT_VALID',
        message:
          'No se puede realizar esta accion, debido al estado del registro.',
      }),
      REFRESH: new CodeError({
        code: 'REGISTER_REFRESH',
        message: 'No se pudo actualizar el registro.',
      }),
      NAME_EXIST: new CodeError({
        code: 'NAME_EXIST',
        message: 'Ya existe el nombre ',
      }),
      INVALID_DID: new CodeError({
        code: 'INVALID_DID',
        message: 'El did es inválido.',
      }),
    },
  },
  COMPANY: {
    ERR: {
      GET: new CodeError({
        code: 'COMPANY_GET',
        message: 'No se encontro la Empresa.',
      }),
      NAME_NOT_UNIQUE: new CodeError({
        code: 'NAME_NOT_UNIQUE',
        message: 'El nombre de la empresa ya existe.',
      }),
      IS_USED: new CodeError({
        code: 'COMPANY_IS_USED',
        message: 'La empresa que se desea borrar is being used ',
      }),
    },
  },
  USER: {
    ERR: {
      INVALID_USER: new CodeError({
        code: 'INVALID_USER',
        message: 'El usuario y contraseña no coinciden.',
      }),
      CREATE: new CodeError({
        code: 'USER_CREATE',
        message: 'El usuario no pudo ser creado.',
      }),
      GET: new CodeError({
        code: 'USER_GET',
        message: 'El usuario no pudo ser obtenido.',
      }),
      SET_NAME: new CodeError({
        code: 'DELEGATE_SET_NAME',
        message: 'El delegado no pudo ser verificado.',
      }),
      GET_NAME: new CodeError({
        code: 'USER_GET_NAME',
        message: 'El nombre del usurio no pudo ser obtenido.',
      }),
      UNIQUE_NAME: new CodeError({
        code: 'UNIQUE_NAME',
        message: 'El nombre del usuario ya existe.',
      }),
      DELETE: new CodeError({
        code: 'USER_DELETE',
        message: 'El modelo de usuario no pudo ser borrado.',
      }),
      EDIT: new CodeError({
        code: 'USER_EDIT',
        message: 'El modelo de usuario no pudo ser editado.',
      }),
    },
  },
  VALIDATION: {
    INVALID_TOKEN: new CodeError({
      code: 'INVALID_TOKEN',
      message: 'Token invalido.',
    }),
    ROLES: {
      code: 'PERMISSION_DENIED',
      message: 'Esta operacion requiere privilegios que no tienes.',
    },
    OFFER_DATA_TYPE: {
      INVALID_DATA_TYPE(data) {
        return {
          code: 'INVALID_DATA_TYPE',
          message: `${data} no es una sección válida .`,
        };
      },
    },
    OFFER_DATA_VALUE: {
      INVALID_DATA_VALUE(type) {
        return {
          code: 'INVALID_DATA_VALUE',
          message: `el campo ${type} contiene un valor invalido.`,
        };
      },
    },
    TEMPLATE_DATA: {
      INVALID_TEMPLATE_ID: {
        code: 'INVALID_TEMPLATE_ID',
        message: 'No existe oferta  con ese id.',
      },
      INVALID_OFFER_PREVIEW_DATA: {
        code: 'INVALID_TEMPLATE_PREVIEW_DATA',
        message: 'La oferta de empleo no contiene los tipos requeridos.',
      },
      NO_DATA(type) {
        return {
          code: 'NO_DATA',
          message: `El campo ${type} no contiene datos.`,
        };
      },
      INVALID_DATA(type) {
        return {
          code: 'INVALID_DATA',
          message: `El campo ${type} tiene un formato invalido.`,
        };
      },
      INVALID_TYPE(type) {
        return {
          code: 'INVALID_TYPE',
          message: `El campo ${type} tiene un tipo de dato invalido.`,
        };
      },
    },

    REQUESTER_IS: (user) => `El token le pertenece a: ${user.name}`,
    COMMON_PASSWORD: new CodeError({
      code: 'COMMON_PASSWORD',
      message:
        'La contraseña ingresada es de uso común, por favor ingrese una mas segura.',
    }),
    DOES_NOT_EXIST(type) {
      return new CodeError({
        code: 'PARAMETER_MISSING',
        message: `Falta el campo: ${type}`,
      });
    },
    STRING_FORMAT_INVALID(field) {
      return new CodeError({
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba un texto.`,
      });
    },
    LENGTH_INVALID(field, min, max) {
      const code = 'PARAMETER_TYPE_ERROR';
      const msgStart = `El campo ${field} tendria que tener.`;

      if (min && !max) {
        return new CodeError({
          code,
          message: `${msgStart} mas que ${min} caracteres.`,
        });
      }

      if (!min && max) {
        return new CodeError({
          code,
          message: `${msgStart} menos que ${max} caracteres.`,
        });
      }

      if (min === max) {
        return new CodeError({
          code,
          message: `${msgStart} exactamente ${max} caracteres.`,
        });
      }
      return new CodeError({
        code,
        message: `${msgStart} entre ${min} y ${max} caracteres.`,
      });
    },
  },
};
