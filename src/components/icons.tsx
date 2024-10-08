import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const Icons = {
    Apple: ({ ...props }: IconProps) => (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M15.6318 10.534C15.6229 8.90075 16.3619 7.668 17.8577 6.76012C17.0208 5.56297 15.7564 4.90432 14.087 4.77525C12.5065 4.65064 10.7792 5.69648 10.147 5.69648C9.47922 5.69648 7.94776 4.81976 6.74574 4.81976C4.26157 4.85981 1.62158 6.80018 1.62158 10.7477C1.62158 11.9137 1.83527 13.1182 2.26266 14.3614C2.8325 15.9947 4.88929 20 7.03512 19.9332C8.157 19.9065 8.94944 19.1366 10.4097 19.1366C11.8254 19.1366 12.5599 19.9332 13.8109 19.9332C15.9746 19.9021 17.8355 16.2617 18.3786 14.6239C15.476 13.2577 15.6318 10.6186 15.6318 10.534ZM13.112 3.22652C14.3274 1.7846 14.2161 0.47174 14.1804 0C13.1075 0.0623053 11.8654 0.729862 11.1576 1.55318C10.3785 2.43436 9.91996 3.5247 10.0179 4.753C11.1799 4.84201 12.2394 4.24566 13.112 3.22652Z'
                fill='black'
            />
        </svg>
    ),
    Whatsapp: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <g clipPath='url(#clip0_62_4273)'>
                <path
                    d='M0.514363 11.8962C0.513799 13.9194 1.04656 15.8948 2.0596 17.636L0.41748 23.5852L6.55327 21.9888C8.25035 22.9055 10.1518 23.3859 12.0841 23.386H12.0891C18.4679 23.386 23.6603 18.2357 23.663 11.9053C23.6643 8.83772 22.4614 5.95321 20.276 3.78305C18.091 1.61309 15.185 0.417416 12.0887 0.416016C5.70916 0.416016 0.516997 5.56607 0.514363 11.8962Z'
                    fill='url(#paint0_linear_62_4273)'
                />
                <path
                    d='M0.100645 11.892C0.0999868 13.9879 0.651843 16.034 1.701 17.8376L0 24L6.35579 22.3464C8.10702 23.2938 10.0787 23.7934 12.085 23.7941H12.0902C18.6978 23.7941 24.0768 18.4585 24.0796 11.9015C24.0807 8.72373 22.8346 5.73552 20.5711 3.48762C18.3074 1.24001 15.2974 0.00130665 12.0902 0C5.4815 0 0.103279 5.33485 0.100645 11.892ZM3.88575 17.527L3.64844 17.1532C2.65083 15.5792 2.12427 13.7604 2.12503 11.8927C2.12709 6.4426 6.59725 2.0085 12.094 2.0085C14.7559 2.00962 17.2576 3.03926 19.1392 4.90739C21.0207 6.7757 22.056 9.25926 22.0553 11.9007C22.0529 17.3509 17.5826 21.7855 12.0902 21.7855H12.0863C10.2979 21.7846 8.54393 21.308 7.01432 20.4075L6.6503 20.1933L2.87864 21.1745L3.88575 17.527Z'
                    fill='#60D669'
                />
                <path
                    d='M9.09359 6.92091C8.86916 6.42597 8.63298 6.41599 8.41955 6.40731C8.24479 6.39984 8.045 6.4004 7.8454 6.4004C7.64562 6.4004 7.32101 6.47497 7.04664 6.77223C6.77198 7.06978 5.99805 7.7888 5.99805 9.25122C5.99805 10.7136 7.07157 12.1271 7.22122 12.3256C7.37106 12.5237 9.29366 15.6208 12.3386 16.8123C14.8692 17.8025 15.3842 17.6055 15.9334 17.5559C16.4827 17.5064 17.7059 16.837 17.9555 16.1429C18.2052 15.4489 18.2052 14.854 18.1303 14.7297C18.0554 14.6059 17.8557 14.5315 17.5561 14.3829C17.2565 14.2343 15.7836 13.5151 15.509 13.4159C15.2344 13.3168 15.0347 13.2673 14.8349 13.5649C14.6351 13.8621 14.0614 14.5315 13.8866 14.7297C13.7119 14.9284 13.537 14.9531 13.2375 14.8045C12.9378 14.6553 11.973 14.3418 10.8284 13.3293C9.93779 12.5414 9.33655 11.5684 9.16179 11.2707C8.98702 10.9736 9.14307 10.8125 9.29329 10.6644C9.42789 10.5312 9.59296 10.3173 9.7429 10.1438C9.89227 9.97016 9.94212 9.8463 10.042 9.64807C10.142 9.44964 10.092 9.27605 10.0172 9.12737C9.94212 8.97869 9.35997 7.50862 9.09359 6.92091Z'
                    fill='white'
                />
            </g>
            <defs>
                <linearGradient
                    id='paint0_linear_62_4273'
                    x1='1162.7'
                    y1='2317.33'
                    x2='1162.7'
                    y2='0.416016'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='#1FAF38' />
                    <stop offset='1' stopColor='#60D669' />
                </linearGradient>
                <clipPath id='clip0_62_4273'>
                    <rect width='24' height='24' fill='white' />
                </clipPath>
            </defs>
        </svg>
    ),
    Facebook: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <g clipPath='url(#clip0_62_4278)'>
                <path
                    d='M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z'
                    fill='#0866FF'
                />
                <path
                    d='M16.7002 15.6672L17.3737 12H13.454V10.703C13.454 8.76526 14.2143 8.01982 16.1818 8.01982C16.7929 8.01982 17.2849 8.0347 17.5681 8.06446V4.74046C17.0314 4.59118 15.7196 4.44238 14.9593 4.44238C10.9493 4.44238 9.10087 6.3355 9.10087 10.4198V12H6.62646V15.6672H9.10087V23.6467C10.0292 23.8771 11.0002 24 11.9996 24C12.4916 24 12.9769 23.9697 13.4535 23.9121V15.6672H16.6997H16.7002Z'
                    fill='white'
                />
            </g>
            <defs>
                <clipPath id='clip0_62_4278'>
                    <rect width='24' height='24' fill='white' />
                </clipPath>
            </defs>
        </svg>
    ),
    Instagram: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <g clipPath='url(#clip0_62_4279)'>
                <path
                    d='M18.375 0H5.625C2.5184 0 0 2.5184 0 5.625V18.375C0 21.4816 2.5184 24 5.625 24H18.375C21.4816 24 24 21.4816 24 18.375V5.625C24 2.5184 21.4816 0 18.375 0Z'
                    fill='url(#paint0_radial_62_4279)'
                />
                <path
                    d='M18.375 0H5.625C2.5184 0 0 2.5184 0 5.625V18.375C0 21.4816 2.5184 24 5.625 24H18.375C21.4816 24 24 21.4816 24 18.375V5.625C24 2.5184 21.4816 0 18.375 0Z'
                    fill='url(#paint1_radial_62_4279)'
                />
                <path
                    d='M12.0008 2.625C9.45478 2.625 9.13519 2.63616 8.13525 2.68163C7.13719 2.72738 6.45591 2.88534 5.85984 3.11719C5.24316 3.35662 4.72013 3.67697 4.19906 4.19822C3.67753 4.71937 3.35719 5.24241 3.117 5.85881C2.8845 6.45506 2.72634 7.13662 2.68144 8.13422C2.63672 9.13425 2.625 9.45394 2.625 12.0001C2.625 14.5463 2.63625 14.8648 2.68163 15.8647C2.72756 16.8628 2.88553 17.5441 3.11719 18.1402C3.35681 18.7568 3.67716 19.2799 4.19841 19.8009C4.71938 20.3225 5.24241 20.6436 5.85862 20.883C6.45516 21.1148 7.13653 21.2728 8.13441 21.3186C9.13444 21.364 9.45375 21.3752 11.9997 21.3752C14.5461 21.3752 14.8646 21.364 15.8646 21.3186C16.8626 21.2728 17.5447 21.1148 18.1412 20.883C18.7576 20.6436 19.2799 20.3225 19.8007 19.8009C20.3223 19.2799 20.6425 18.7568 20.8828 18.1404C21.1133 17.5441 21.2715 16.8626 21.3184 15.8649C21.3633 14.865 21.375 14.5463 21.375 12.0001C21.375 9.45394 21.3633 9.13444 21.3184 8.13441C21.2715 7.13634 21.1133 6.45516 20.8828 5.85909C20.6425 5.24241 20.3223 4.71937 19.8007 4.19822C19.2793 3.67678 18.7578 3.35644 18.1406 3.11728C17.543 2.88534 16.8613 2.72728 15.8632 2.68163C14.8632 2.63616 14.5448 2.625 11.9979 2.625H12.0008ZM11.1598 4.31447C11.4095 4.31409 11.688 4.31447 12.0008 4.31447C14.5041 4.31447 14.8007 4.32347 15.7892 4.36838C16.7032 4.41019 17.1994 4.56291 17.5298 4.69125C17.9674 4.86112 18.2793 5.06428 18.6072 5.3925C18.9353 5.72062 19.1384 6.03309 19.3088 6.47062C19.4371 6.80062 19.59 7.29675 19.6316 8.21081C19.6765 9.19913 19.6863 9.49594 19.6863 11.9979C19.6863 14.4999 19.6765 14.7968 19.6316 15.7851C19.5898 16.6991 19.4371 17.1952 19.3088 17.5253C19.1389 17.9629 18.9353 18.2744 18.6072 18.6023C18.2791 18.9305 17.9676 19.1335 17.5298 19.3035C17.1997 19.4324 16.7032 19.5848 15.7892 19.6266C14.8009 19.6715 14.5041 19.6812 12.0008 19.6812C9.49753 19.6812 9.20081 19.6715 8.21259 19.6266C7.29853 19.5844 6.80241 19.4317 6.47166 19.3033C6.03422 19.1333 5.72166 18.9303 5.39353 18.6022C5.06541 18.274 4.86234 17.9623 4.692 17.5246C4.56366 17.1945 4.41075 16.6984 4.36913 15.7843C4.32422 14.796 4.31522 14.4992 4.31522 11.9956C4.31522 9.492 4.32422 9.19678 4.36913 8.20847C4.41094 7.29441 4.56366 6.79828 4.692 6.46781C4.86197 6.03028 5.06541 5.71781 5.39363 5.38969C5.72184 5.06156 6.03422 4.85841 6.47175 4.68816C6.80222 4.55925 7.29853 4.40691 8.21259 4.36491C9.07744 4.32581 9.41259 4.31409 11.1598 4.31212V4.31447ZM17.0052 5.87109C16.3841 5.87109 15.8802 6.37453 15.8802 6.99572C15.8802 7.61681 16.3841 8.12072 17.0052 8.12072C17.6263 8.12072 18.1302 7.61681 18.1302 6.99572C18.1302 6.37463 17.6263 5.87072 17.0052 5.87072V5.87109ZM12.0008 7.18556C9.34209 7.18556 7.18641 9.34125 7.18641 12.0001C7.18641 14.6589 9.34209 16.8136 12.0008 16.8136C14.6597 16.8136 16.8146 14.6589 16.8146 12.0001C16.8146 9.34134 14.6595 7.18556 12.0007 7.18556H12.0008ZM12.0008 8.87503C13.7267 8.87503 15.1259 10.2741 15.1259 12.0001C15.1259 13.7259 13.7267 15.1252 12.0008 15.1252C10.275 15.1252 8.87588 13.7259 8.87588 12.0001C8.87588 10.2741 10.2749 8.87503 12.0008 8.87503Z'
                    fill='white'
                />
            </g>
            <defs>
                <radialGradient
                    id='paint0_radial_62_4279'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(6.375 25.8485) rotate(-90) scale(23.7858 22.1227)'
                >
                    <stop stopColor='#FFDD55' />
                    <stop offset='0.1' stopColor='#FFDD55' />
                    <stop offset='0.5' stopColor='#FF543E' />
                    <stop offset='1' stopColor='#C837AB' />
                </radialGradient>
                <radialGradient
                    id='paint1_radial_62_4279'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(-4.02009 1.72884) rotate(78.681) scale(10.6324 43.827)'
                >
                    <stop stopColor='#3771C8' />
                    <stop offset='0.128' stopColor='#3771C8' />
                    <stop offset='1' stopColor='#6600FF' stopOpacity='0' />
                </radialGradient>
                <clipPath id='clip0_62_4279'>
                    <rect width='24' height='24' fill='white' />
                </clipPath>
            </defs>
        </svg>
    ),
    Linkedin: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M12.0238 0H11.9692C5.35878 0 0 5.36035 0 11.9727V12.0273C0 18.6397 5.35878 24 11.9692 24H12.0238C18.6342 24 23.9929 18.6397 23.9929 12.0273V11.9727C23.9929 5.36035 18.6342 0 12.0238 0Z'
                fill='#007EBB'
            />
            <path
                d='M5.72227 7.97698C5.4062 7.68353 5.24902 7.32028 5.24902 6.88809C5.24902 6.4559 5.40704 6.07669 5.72227 5.78239C6.03833 5.48894 6.44517 5.3418 6.94364 5.3418C7.44211 5.3418 7.83299 5.48894 8.14821 5.78239C8.46428 6.07585 8.62146 6.44497 8.62146 6.88809C8.62146 7.33122 8.46344 7.68353 8.14821 7.97698C7.83215 8.27043 7.43119 8.41758 6.94364 8.41758C6.4561 8.41758 6.03833 8.27043 5.72227 7.97698ZM8.35584 9.66033V18.6573H5.5138V9.66033H8.35584Z'
                fill='#E4E7E9'
            />
            <path
                d='M17.8166 10.5481C18.4361 11.2207 18.7455 12.144 18.7455 13.3195V18.4973H16.0464V13.6844C16.0464 13.0916 15.8925 12.6308 15.5857 12.3029C15.2789 11.975 14.8653 11.8102 14.3475 11.8102C13.8297 11.8102 13.4161 11.9741 13.1093 12.3029C12.8025 12.6308 12.6487 13.0916 12.6487 13.6844V18.4973H9.93359V9.63408H12.6487V10.8096C12.9236 10.4177 13.2943 10.1083 13.76 9.88044C14.2256 9.65258 14.7493 9.53906 15.3319 9.53906C16.3691 9.53906 17.1979 9.8754 17.8166 10.5481Z'
                fill='#E4E7E9'
            />
        </svg>
    ),
    Email: ({ ...props }: IconProps) => (
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <circle cx='16' cy='16' r='15.5' fill='white' stroke='#191C1F' />
            <path
                d='M9.60059 12.1602L16.2724 16.6402L22.4006 12.307M10.2432 12.1602H21.758C22.1129 12.1602 22.4006 12.4005 22.4006 12.6969V21.2234C22.4006 21.5198 22.1129 21.7602 21.758 21.7602H10.2432C9.88827 21.7602 9.60059 21.5198 9.60059 21.2234V12.6969C9.60059 12.4005 9.88827 12.1602 10.2432 12.1602Z'
                stroke='#191C1F'
            />
        </svg>
    ),
    Phone: ({ ...props }: IconProps) => (
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <circle cx='16' cy='16' r='15.5' fill='white' stroke='#191C1F' />
            <path
                d='M12.1429 11.6097C12.0568 11.6123 11.9721 11.6311 11.8938 11.6649C11.8156 11.6988 11.7453 11.747 11.6873 11.8067C11.6293 11.8664 11.5847 11.9364 11.5561 12.0126C11.5275 12.0888 11.5154 12.1695 11.5208 12.2501C11.6068 13.6325 12.0126 17.0054 13.9553 19.1088C16.2817 21.6431 19.3114 22.5163 22.4198 22.3872C22.5864 22.3779 22.7431 22.3097 22.8581 22.1964C22.9731 22.0831 23.038 21.9331 23.0395 21.7767V19.5627C23.0376 19.3561 22.9616 19.1561 22.8238 18.9949C22.686 18.8336 22.4944 18.7204 22.2796 18.6734L20.723 18.3508C20.5305 18.3124 20.33 18.3289 20.1477 18.3983C19.9653 18.4678 19.8093 18.5868 19.7 18.7402L19.3557 19.2286C19.3241 19.2733 19.2768 19.3063 19.2221 19.3218C19.1673 19.3374 19.1085 19.3346 19.0557 19.3139C18.2638 18.9936 15.1087 17.6113 14.7619 15.2798C14.7552 15.2347 14.7627 15.1888 14.7837 15.1478C14.8048 15.1068 14.8382 15.0726 14.88 15.0494L15.5046 14.6923C15.6759 14.5928 15.8105 14.4464 15.8901 14.2729C15.9697 14.0994 15.9905 13.9072 15.9497 13.7223L15.6079 12.2386C15.5579 12.0307 15.4326 11.8455 15.2533 11.7144C15.0739 11.5834 14.8516 11.5146 14.6242 11.5198L12.1429 11.6097Z'
                stroke='#191C1F'
            />
        </svg>
    ),
    ArrowRight: ({ ...props }: IconProps) => (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M3.125 10H16.875'
                stroke='#FA8232'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.25 4.375L16.875 10L11.25 15.625'
                stroke='#FA8232'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    CaretRight: ({
        dir = 'right',
        ...props
    }: IconProps & {
        dir?: 'right' | 'left'
    }) => (
        <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className={dir === 'left' ? 'rotate-180' : ''}
        >
            <path
                className={props.className}
                d='M4.5 2.25L8.25 6L4.5 9.75'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    PhoneCircle: ({ ...props }: IconProps) => (
        <svg
            width='83'
            height='81'
            viewBox='0 0 83 81'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <circle cx='42.5' cy='41' r='31.5' fill='#B20404' />
            <circle cx='79.5' cy='13' r='3.5' fill='#B20404' />
            <circle cx='8.5' cy='5' r='4.5' fill='#B20404' />
            <circle cx='4' cy='59.5' r='2' fill='#B20404' />
            <circle cx='73' cy='71.5' r='1' fill='#B20404' />
            <path
                d='M53.0014 46.42V49.42C53.0025 49.6985 52.9455 49.9741 52.8339 50.2293C52.7223 50.4845 52.5587 50.7136 52.3535 50.9018C52.1483 51.0901 51.906 51.2335 51.6421 51.3227C51.3783 51.4119 51.0988 51.445 50.8214 51.42C47.7442 51.0856 44.7884 50.0341 42.1914 48.35C39.7752 46.8146 37.7267 44.7661 36.1914 42.35C34.5014 39.7412 33.4496 36.771 33.1214 33.68C33.0964 33.4034 33.1293 33.1247 33.2179 32.8616C33.3065 32.5985 33.449 32.3567 33.6362 32.1516C33.8234 31.9465 34.0512 31.7827 34.3052 31.6705C34.5592 31.5583 34.8337 31.5002 35.1114 31.5H38.1114C38.5967 31.4952 39.0672 31.6671 39.4352 31.9835C39.8031 32.3 40.0435 32.7394 40.1114 33.22C40.238 34.18 40.4728 35.1227 40.8114 36.03C40.9459 36.3879 40.9751 36.7769 40.8953 37.1509C40.8155 37.5248 40.6303 37.8681 40.3614 38.14L39.0914 39.41C40.515 41.9135 42.5879 43.9864 45.0914 45.41L46.3614 44.14C46.6333 43.8711 46.9766 43.6858 47.3505 43.6061C47.7245 43.5263 48.1135 43.5554 48.4714 43.69C49.3787 44.0285 50.3213 44.2634 51.2814 44.39C51.7672 44.4585 52.2108 44.7032 52.5279 45.0775C52.8451 45.4518 53.0136 45.9296 53.0014 46.42Z'
                fill='white'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <circle cx='47' cy='2.5' r='1' fill='#B20404' />
            <circle cx='27.5' cy='79' r='1.5' fill='#B20404' />
            <circle cx='54.5' cy='77' r='0.5' fill='#B20404' />
            <circle cx='76' cy='49.5' r='1' fill='#B20404' />
            <circle cx='0.5' cy='34' r='0.5' fill='#B20404' />
        </svg>
    ),
    EmailCircle: ({ ...props }: IconProps) => (
        <svg
            width='83'
            height='81'
            viewBox='0 0 83 81'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <circle cx='42.5' cy='41' r='31.5' fill='#B20404' />
            <circle cx='79.5' cy='13' r='3.5' fill='#B20404' />
            <circle cx='8.5' cy='5' r='4.5' fill='#B20404' />
            <circle cx='4' cy='59.5' r='2' fill='#B20404' />
            <circle cx='73' cy='71.5' r='1' fill='#B20404' />
            <path
                d='M53 37.035V46.5C53 47.2652 52.7077 48.0015 52.1827 48.5583C51.6578 49.115 50.9399 49.4501 50.176 49.495L50 49.5H36C35.2348 49.5001 34.4985 49.2077 33.9417 48.6828C33.385 48.1578 33.0499 47.4399 33.005 46.676L33 46.5V37.035L42.445 43.332L42.561 43.398C42.6977 43.4648 42.8478 43.4995 43 43.4995C43.1522 43.4995 43.3023 43.4648 43.439 43.398L43.555 43.332L53 37.035Z'
                fill='white'
            />
            <path
                d='M50.0003 33.5C51.0803 33.5 52.0273 34.07 52.5553 34.927L43.0003 41.297L33.4453 34.927C33.696 34.5198 34.0405 34.1784 34.45 33.9314C34.8595 33.6844 35.3221 33.5389 35.7993 33.507L36.0003 33.5H50.0003Z'
                fill='white'
            />
            <circle cx='47' cy='2.5' r='1' fill='#B20404' />
            <circle cx='27.5' cy='79' r='1.5' fill='#B20404' />
            <circle cx='54.5' cy='77' r='0.5' fill='#B20404' />
            <circle cx='76' cy='49.5' r='1' fill='#B20404' />
            <circle cx='0.5' cy='34' r='0.5' fill='#B20404' />
        </svg>
    ),
    Star: ({ ...props }: IconProps) => (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                className={props.className}
                d='M10.3439 14.8985L14.2814 17.3985C14.7892 17.7188 15.4142 17.2422 15.2657 16.6563L14.1251 12.1719C14.0943 12.0476 14.0992 11.9171 14.1393 11.7955C14.1793 11.6738 14.253 11.566 14.3517 11.4844L17.8829 8.53908C18.3439 8.15627 18.1095 7.38283 17.5079 7.34377L12.8986 7.04689C12.7728 7.03958 12.6519 6.99578 12.5506 6.92086C12.4493 6.84594 12.372 6.74314 12.3282 6.62502L10.6095 2.29689C10.564 2.17182 10.4811 2.06377 10.3721 1.98742C10.2631 1.91107 10.1332 1.87012 10.0001 1.87012C9.86702 1.87012 9.73715 1.91107 9.62814 1.98742C9.51912 2.06377 9.43624 2.17182 9.39074 2.29689L7.67199 6.62502C7.62819 6.74314 7.55092 6.84594 7.44964 6.92086C7.34836 6.99578 7.22745 7.03958 7.10168 7.04689L2.49231 7.34377C1.89074 7.38283 1.65637 8.15627 2.11731 8.53908L5.64856 11.4844C5.74726 11.566 5.82089 11.6738 5.86097 11.7955C5.90106 11.9171 5.90596 12.0476 5.87512 12.1719L4.82043 16.3281C4.64074 17.0313 5.39074 17.6016 5.99231 17.2188L9.65637 14.8985C9.75912 14.8331 9.87836 14.7984 10.0001 14.7984C10.1219 14.7984 10.2411 14.8331 10.3439 14.8985Z'
                fill='#FA8232'
            />
        </svg>
    ),
    Location: ({ ...props }: IconProps) => (
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <rect width='32' height='32' rx='8' fill='#E4E7E9' />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9 14.6542C9 10.9743 12.1655 8 15.9946 8C19.8344 8 23 10.9743 23 14.6542C23 16.5086 22.3058 18.2301 21.1631 19.6893C19.9025 21.2988 18.3488 22.7012 16.6 23.8019C16.1997 24.0563 15.8385 24.0755 15.3992 23.8019C13.6404 22.7012 12.0867 21.2988 10.8369 19.6893C9.6934 18.2301 9 16.5086 9 14.6542ZM13.6895 14.8615C13.6895 16.0943 14.725 17.0639 15.9947 17.0639C17.2652 17.0639 18.3107 16.0943 18.3107 14.8615C18.3107 13.6384 17.2652 12.6216 15.9947 12.6216C14.725 12.6216 13.6895 13.6384 13.6895 14.8615Z'
                fill='#B20404'
            />
        </svg>
    ),
    Duration: ({ ...props }: IconProps) => (
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <rect width='32' height='32' rx='8' fill='#E4E7E9' />
            <path
                d='M16 7.8667C11.5806 7.8667 8 11.4473 8 15.8667C8 20.2861 11.5806 23.8667 16 23.8667C20.4194 23.8667 24 20.2861 24 15.8667C24 11.4473 20.4194 7.8667 16 7.8667ZM17.8419 19.1602L14.9968 17.0925C14.8968 17.0183 14.8387 16.9022 14.8387 16.7796V11.3506C14.8387 11.1377 15.0129 10.9635 15.2258 10.9635H16.7742C16.9871 10.9635 17.1613 11.1377 17.1613 11.3506V15.7925L19.2097 17.2828C19.3839 17.4086 19.4194 17.6506 19.2935 17.8248L18.3839 19.0764C18.2581 19.2473 18.0161 19.2861 17.8419 19.1602Z'
                fill='#24C6C6'
            />
        </svg>
    ),
    Plus: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M12 5V19'
                stroke='#FF9C00'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M5 12H19'
                stroke='#FF9C00'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    Check: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M20 6L9 17L4 12'
                stroke='#20B038'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    X: ({ ...props }: IconProps) => (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M18 6L6 18'
                stroke='#B20404'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M6 6L18 18'
                stroke='#B20404'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    Send: ({ ...props }: IconProps) => (
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <g clipPath='url(#clip0_150_1719)'>
                <path
                    d='M0.591909 12.0304C0.245722 12.1689 0.0139103 12.4985 0.000597836 12.8711C-0.0126521 13.2438 0.195285 13.5891 0.530722 13.7517L11.5649 19.1032L30.6685 0L0.591909 12.0304Z'
                    fill='#B20404'
                />
                <path
                    d='M12.8955 20.4363L18.247 31.4706C18.4048 31.7959 18.7344 32.0013 19.094 32.0013C19.1052 32.0013 19.1163 32.0011 19.1276 32.0006C19.5002 31.9874 19.8299 31.7556 19.9684 31.4094L31.999 1.33301L12.8955 20.4363Z'
                    fill='#B20404'
                />
            </g>
            <defs>
                <clipPath id='clip0_150_1719'>
                    <rect width='32' height='32' fill='white' />
                </clipPath>
            </defs>
        </svg>
    ),
    StarLarge: ({ ...props }: IconProps) => (
        <svg
            width='46'
            height='46'
            viewBox='0 0 46 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M22.9997 3.83301L28.9222 15.8313L42.1663 17.7672L32.583 27.1013L34.8447 40.288L22.9997 34.0588L11.1547 40.288L13.4163 27.1013L3.83301 17.7672L17.0772 15.8313L22.9997 3.83301Z'
                stroke='#5A5A5A'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    Filter: ({ ...props }: IconProps) => (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M19.25 9.99989H6.895M2.534 9.99989H0.75M2.534 9.99989C2.534 9.42172 2.76368 8.86723 3.17251 8.4584C3.58134 8.04957 4.13583 7.81989 4.714 7.81989C5.29217 7.81989 5.84666 8.04957 6.25549 8.4584C6.66432 8.86723 6.894 9.42172 6.894 9.99989C6.894 10.5781 6.66432 11.1326 6.25549 11.5414C5.84666 11.9502 5.29217 12.1799 4.714 12.1799C4.13583 12.1799 3.58134 11.9502 3.17251 11.5414C2.76368 11.1326 2.534 10.5781 2.534 9.99989ZM19.25 16.6069H13.502M13.502 16.6069C13.502 17.1852 13.2718 17.7403 12.8628 18.1492C12.4539 18.5582 11.8993 18.7879 11.321 18.7879C10.7428 18.7879 10.1883 18.5572 9.77951 18.1484C9.37068 17.7396 9.141 17.1851 9.141 16.6069M13.502 16.6069C13.502 16.0286 13.2718 15.4745 12.8628 15.0655C12.4539 14.6566 11.8993 14.4269 11.321 14.4269C10.7428 14.4269 10.1883 14.6566 9.77951 15.0654C9.37068 15.4742 9.141 16.0287 9.141 16.6069M9.141 16.6069H0.75M19.25 3.39289H16.145M11.784 3.39289H0.75M11.784 3.39289C11.784 2.81472 12.0137 2.26023 12.4225 1.8514C12.8313 1.44257 13.3858 1.21289 13.964 1.21289C14.2503 1.21289 14.5338 1.26928 14.7983 1.37883C15.0627 1.48839 15.3031 1.64897 15.5055 1.8514C15.7079 2.05383 15.8685 2.29415 15.9781 2.55864C16.0876 2.82313 16.144 3.10661 16.144 3.39289C16.144 3.67917 16.0876 3.96265 15.9781 4.22714C15.8685 4.49163 15.7079 4.73195 15.5055 4.93438C15.3031 5.13681 15.0627 5.29739 14.7983 5.40695C14.5338 5.5165 14.2503 5.57289 13.964 5.57289C13.3858 5.57289 12.8313 5.34321 12.4225 4.93438C12.0137 4.52555 11.784 3.97106 11.784 3.39289Z'
                stroke='#240301'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
        </svg>
    ),
}
