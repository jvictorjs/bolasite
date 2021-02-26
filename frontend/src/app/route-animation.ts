import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
} from '@angular/animations';

// STACKOVERFLOW https://medium.com/@tejozarkar/angular-route-transition-animation-in-5-easy-steps-ab0ddc8230e
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('Contact => *', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('1.1s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1.1s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('Home => Futebol-event', [
            query(':enter, :leave', style({ position: 'fixed', width: '90%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('Futebol => Futebol-event', [
            query(':enter, :leave', style({ position: 'fixed', width: '90%', 'padding-left':'1px', 'padding-right':'1px'}), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)', 'margin-left':'20px' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('Futebol-event => Futebol', [
            query(':enter, :leave', style({ position: 'fixed', width: '90%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.7s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('About => Contact', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('1.5s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('About => Home', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('1.1s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1.1s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ])
    ]);