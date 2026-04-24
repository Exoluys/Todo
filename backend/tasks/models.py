from django.db import models


class Task(models.Model):
    user = models.ForeignKey(to='accounts.CustomUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    is_complete = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
