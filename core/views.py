from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "annotate_site/index.html"
