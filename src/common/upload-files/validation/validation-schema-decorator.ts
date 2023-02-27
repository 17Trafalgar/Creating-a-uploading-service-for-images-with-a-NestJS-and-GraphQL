import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { IUpload } from '../model/interface/upload.interface';

@ValidatorConstraint()
class imageUpload implements ValidatorConstraintInterface {
    async validate(image: IUpload) {
        const { mimetype } = await image;

        const mimeTypes: string[] = ['image/gif', 'image/png', 'image/jpeg'];
        if (mimeTypes.includes(mimetype)) {
            return true;
        }
        return false;
    }
}

export function isImage(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: imageUpload,
        });
    };
}
