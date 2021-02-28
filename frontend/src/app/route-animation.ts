import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
} from '@angular/animations';

const duration = '0.8s';
const aceleration = ' ease-in-out' // ease, ease-in, ease-out, ease-in-out, or a cubic-bezier() // cubic-bezier(.17,.67,.88,.1)

const slideFromLeftToRight_queryGroup =
    [
        query(':enter, :leave', style({
            position: 'fixed',
            // 'padding-left': '0px', 'padding-right': '0px',
            // 'margin-left': '0px', 'margin-right': '0px',
            width: '100%'
        }), { optional: true }),
        group([
            query(':enter', [
                style({
                    transform: 'translateX(100%)'
                }),
                animate(duration + aceleration, style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({
                    transform: 'translateX(0%)'
                }),
                animate(duration + aceleration, style({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ])
    ]

const slideFromRightToLeft_queryGroup = [
    query(':enter, :leave', style({
        position: 'fixed',
        // 'padding-left': '0px', 'padding-right': '0px',
        // 'margin-left': '0px', 'margin-right': '0px',
        width: '100%'
    }), { optional: true }),
    group([
        query(':enter', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate(duration + aceleration, style({
                transform: 'translateX(0%)',
            }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate(duration + aceleration, style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
    ])
]

const diminish_queryGroup = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            // STACKOVERFLOW https://css-tricks.com/almanac/properties/t/transform/
            animate('0.7s ease-in-out', style({ transform: 'rotate(90deg) scale(0.01)' }))
        ], { optional: true }),
    ])
]

// STACKOVERFLOW https://medium.com/@tejozarkar/angular-route-transition-animation-in-5-easy-steps-ab0ddc8230e
// STACKOVERFLOW https://angular.io/guide/route-animations

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('Home => Futebol-event', slideFromLeftToRight_queryGroup),
        transition('Futebol => Futebol-event', slideFromLeftToRight_queryGroup),
        transition('Futebol-event => Futebol', slideFromRightToLeft_queryGroup),
        transition('Products => Products-create', slideFromLeftToRight_queryGroup),
        transition('Products => Products-update', slideFromLeftToRight_queryGroup),
        transition('Products => Products-delete', slideFromLeftToRight_queryGroup),
        transition('Products-delete => Products', slideFromRightToLeft_queryGroup),
        transition('Products-create => Products', slideFromRightToLeft_queryGroup),
        transition('Products-update => Products', slideFromRightToLeft_queryGroup),
        transition('About => *', diminish_queryGroup),
        transition('TV-guide => *', diminish_queryGroup),
        transition('Products => *', diminish_queryGroup),
        transition('Futebol => *', diminish_queryGroup),
    ]);