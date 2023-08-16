import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidReportType(values: string[]) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidReportType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [values],
      options: {message: 'Must be a valid report type: expense or income (all lowercase)'},
      validator: {
        validate(value: any, args: ValidationArguments) {
            return args.constraints.includes(values);
        }
      },
    });
  };
}