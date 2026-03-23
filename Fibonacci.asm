.686
          .model  flat, c
          .stack  100h
printf    PROTO   arg1:Ptr Byte, printlist:VARARG
scanf     PROTO   arg2:Ptr Byte, inputlist:VARARG
          .data
          ;------------- FORMATOS DAS MENSAGENS-------------------
msg1fmt   byte  "%s", 0
in1fmt    byte  "%d", 0
msg2fmt   byte  "%s%d", 0Ah, 0Ah, 0
          ;------------- MENSAGENS A SEREM IMPRESSAS -------------
msg1      byte  0Ah, "Entre com um numero: ", 0
msg2      byte  0Ah, "O Fibonacci desse numero eh: ",0
          ;------------- MENSAGENS DE ERRO -----------------------


dsb       sdword ?
var       sdword 0

          .code 
main      proc 
          INVOKE printf, ADDR msg1fmt, ADDR msg1
          INVOKE scanf, ADDR in1fmt, ADDR dsb
          
					call FIBONACCI
          
          INVOKE printf, ADDR msg2fmt, ADDR msg2, var

          ret
main      endp

FIBONACCI proc
				  push eax
				  push ebx
				  push ecx
				  push edx

fibo:			  cmp dsb, 0
				  je  endse0
				  cmp dsb, 1
				  je  endse1
				  mov eax, 0
				  mov ebx, 1
				  mov ecx, dsb
          .while (ecx > 1)

				  mov edx, ebx
          add ebx, eax
				  mov eax, edx
          dec ecx
          .endw
				  mov eax, ebx
				  jmp endfibo

endse0:		mov eax, 0
				  jmp endfibo
				  
endse1:		mov eax, 1
				  jmp endfibo

endfibo:	mov var, eax
				  pop edx
				  pop ecx
				  pop ebx
			    pop eax

				  ret
FIBONACCI	endp
				  end