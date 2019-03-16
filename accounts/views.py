from django.shortcuts import render
from django.http import JsonResponse

def login(request):
    # тестовая вьюха, для проверки работы фронта
    # запрос пока не доходит. Нужно посмотреть как подсунуть csrf_token

    print('\n\nYou are login! \n\n')
    return JsonResponse({'status': True})
