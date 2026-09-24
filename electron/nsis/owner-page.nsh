!include "nsDialogs.nsh"
!include "LogicLib.nsh"
!include "WinMessages.nsh"

Var chtOwnerDialog
Var chtOwnerLoginField
Var chtOwnerPasswordField
Var chtOwnerLogin
Var chtOwnerPassword

Function chtOwnerPageCreate
    nsDialogs::Create 1018
    Pop $chtOwnerDialog

    ${If} $chtOwnerDialog == error
        Abort
    ${EndIf}

    ${NSD_CreateLabel} 0 0 100% 36u "Crie o login do dono do sistema. Ele e a senha protegem os bancos das oficinas salvos neste computador."
    Pop $0

    ${NSD_CreateLabel} 0 40u 100% 12u "Login"
    Pop $0
    ${NSD_CreateText} 0 54u 100% 14u $chtOwnerLogin
    Pop $chtOwnerLoginField

    ${NSD_CreateLabel} 0 76u 100% 12u "Senha (minimo 8 caracteres)"
    Pop $0
    ${NSD_CreatePassword} 0 90u 100% 14u $chtOwnerPassword
    Pop $chtOwnerPasswordField

    nsDialogs::Show
FunctionEnd

Function chtOwnerPageLeave
    ${NSD_GetText} $chtOwnerLoginField $chtOwnerLogin
    ${NSD_GetText} $chtOwnerPasswordField $chtOwnerPassword

    StrLen $0 $chtOwnerLogin
    ${If} $0 < 3
        MessageBox MB_ICONEXCLAMATION "Informe um login com pelo menos 3 caracteres."
        Abort
    ${EndIf}

    StrLen $0 $chtOwnerPassword
    ${If} $0 < 8
        MessageBox MB_ICONEXCLAMATION "Informe uma senha com pelo menos 8 caracteres."
        Abort
    ${EndIf}
FunctionEnd

!macro customPageAfterChangeDir
    Page custom chtOwnerPageCreate chtOwnerPageLeave
!macroend

!macro customInstall
    CreateDirectory "$APPDATA\${PRODUCT_NAME}"
    FileOpen $0 "$APPDATA\${PRODUCT_NAME}\system-owner.setup" w
    FileWrite $0 "login="
    FileWrite $0 $chtOwnerLogin
    FileWrite $0 "$\r$\npassword="
    FileWrite $0 $chtOwnerPassword
    FileWrite $0 "$\r$\n"
    FileClose $0
!macroend
