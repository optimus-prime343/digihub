import { ConfigService } from '@nestjs/config'
import { MailerOptions } from '@nestjs-modules/mailer'

export const createTransporter = (
    configService: ConfigService
): MailerOptions['transport'] => {
    if (process.env.NODE_ENV === 'production') {
        return {
            service: 'SendGrid',
            auth: {
                user: configService.get('SENDGRID_USERNAME'),
                pass: configService.get('SENDGRID_PASSWORD'),
            },
        }
    }
    return {
        host: configService.get('MAILTRAP_HOST'),
        port: configService.get<number>('MAILTRAP_PORT'),
        auth: {
            user: configService.get<string>('MAILTRAP_USER'),
            pass: configService.get<string>('MAILTRAP_PASSWORD'),
        },
    }
}
