from django.db import models
from django.utils import timezone
from datetime import timedelta


class Task(models.Model):
    user = models.ForeignKey(to='accounts.CustomUser', on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()

    is_complete = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def priority(self):
        now = timezone.now()

        if self.due_date <= now:
            return "High"
        elif self.due_date <= now + timedelta(days=1):
            return "Med"
        return "Low"

    def __str__(self):
        return self.title
