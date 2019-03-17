from django.shortcuts import render
from django.http import JsonResponse

def login(request):
    # тестовая вьюха, для проверки работы фронта
    # Нужно посмотреть как подсунуть csrf_token
    # т.к. запрос проходит, только если отключена соответствующая middleware 
    # https://docs.djangoproject.com/en/2.1/ref/csrf/#ajax
    print('\n\nYou are login! \n\n')
    return JsonResponse({'status': True})

def signup(request):
    # тестовая вьюха, для проверки работы фронта
    # Нужно посмотреть как подсунуть csrf_token
    # т.к. запрос проходит, только если отключена соответствующая middleware
    # https://docs.djangoproject.com/en/2.1/ref/csrf/#ajax
    print('\n\nYou are signup! \n\n')
    return JsonResponse({'status': True})
